import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, LessThan, Repository } from "typeorm";

import { convertToMinutes } from "src/common/helpers/convert-to-minutes";
import { TopsisService } from "src/common/services/topsis/topsis.service";

import { Category } from "../categories/category.entity";
import { Task, TaskStatus } from "../tasks/task.entity";

import { Goal, GoalStatus } from "./goal.entity";
import { CreateGoalDto } from "./libs/dto/create-goal.dto";
import { GoalOption } from "./libs/dto/goal-option";
import { GoalWithCategoryName } from "./libs/dto/goal-with-category-name";
import {
  GoalWithFullInfo,
  TaskWithDependencies,
} from "./libs/dto/goal-with-full-info";
import { Progress } from "./libs/dto/progress";
import { UpdateGoalDto } from "./libs/dto/update-goal.dto";

@Injectable()
export class GoalService {
  private readonly logger = new Logger("GoalService");

  constructor(
    @InjectRepository(Goal)
    private readonly goalRepository: Repository<Goal>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly topsisService: TopsisService,
  ) {}

  public async create(
    userId: string,
    createGoalDto: CreateGoalDto,
  ): Promise<Goal> {
    this.logger.log(
      `Creating goal "${createGoalDto.title}" for user with ID: ${userId}`,
    );

    const category = await this.getCategoryAndCheckOwnership(
      userId,
      createGoalDto.categoryId,
    );

    await this.ensureGoalIsUnique(category.id, createGoalDto.title);

    const goal = this.goalRepository.create({
      ...createGoalDto,
      categoryId: category.id,
    });

    const savedGoal = await this.goalRepository.save(goal);
    this.logger.log(`Goal created successfully: ${savedGoal.id}`);
    return savedGoal;
  }

  public async delete(userId: string, goalId: string): Promise<boolean> {
    const goal = await this.findOneOrFail(goalId);
    await this.getCategoryAndCheckOwnership(userId, goal.categoryId);

    const deletedGoal = await this.goalRepository.remove(goal);
    this.logger.log(`Goal deleted successfully: ${deletedGoal.id}`);
    return Boolean(deletedGoal);
  }

  public async findAllByCategoryId(categoryId: string): Promise<Goal[]> {
    this.logger.log(`Finding goals of category with ID: ${categoryId}`);

    return await this.goalRepository.find({
      where: { categoryId },
    });
  }

  public async findAllByUserId(
    userId: string,
  ): Promise<GoalWithCategoryName[]> {
    this.logger.log(`Finding all goals for user ID: ${userId}`);

    const goals = await this.goalRepository
      .createQueryBuilder("goal")
      .innerJoin("goal.category", "category")
      .addSelect(["category.name"])
      .where("category.userId = :userId", { userId })
      .orderBy("goal.createdAt", "DESC")
      .getMany();

    const transformedGoals = goals.map((goal) => {
      return {
        ...goal,
        category: undefined,
        categoryName: (goal as any).category?.name,
      };
    });

    if (!goals.length) {
      this.logger.warn(`No goals found for userId: ${userId}`);
    }

    return transformedGoals;
  }

  public async findOne(userId: string, goalId: string): Promise<Goal> {
    const goal = await this.findOneOrFail(goalId);
    await this.getCategoryAndCheckOwnership(userId, goal.categoryId);
    return goal;
  }

  public async getAvailableOptions(userId: string): Promise<GoalOption[]> {
    this.logger.log(`Finding all goals for user ID: ${userId}`);

    const goals = await this.goalRepository
      .createQueryBuilder("goal")
      .innerJoin("goal.category", "category")
      .addSelect(["category.name"])
      .where("category.userId = :userId", { userId })
      .orderBy("goal.createdAt", "DESC")
      .getMany();

    const options = goals.map((goal) => {
      return {
        id: goal.id,
        title: goal.title,
      };
    });

    if (!options.length) {
      this.logger.warn(`No options found for userId: ${userId}`);
    }

    return options;
  }

  public async getGoalFullInfo(
    userId: string,
    goalId: string,
  ): Promise<GoalWithFullInfo> {
    const goal = await this.findOneOrFail(goalId);
    const category = await this.getCategoryAndCheckOwnership(
      userId,
      goal.categoryId,
    );
    const tasks = await this.getPrioritizedTasks(userId, goalId);

    const progress = await this.calculateProgress(goalId, userId);

    return {
      categoryId: category.id,
      categoryName: category.name,
      createdAt: goal.createdAt,
      description: goal.description,
      id: goal.id,
      priority: goal.priority,
      progress,
      status: goal.status,
      targetDate: goal.targetDate,
      tasks,
      title: goal.title,
      updatedAt: goal.updatedAt,
    };
  }

  async markExpiredGoals(): Promise<void> {
    this.logger.log("Marking expired goals");
    const now = new Date();
    const expiredGoals = await this.goalRepository.find({
      where: {
        status: In([GoalStatus.IN_PROGRESS, GoalStatus.PENDING]),
        targetDate: LessThan(now),
      },
    });
    for (const goal of expiredGoals) {
      goal.status = GoalStatus.NEEDS_CORRECTION;
      await this.goalRepository.save(goal);
    }
  }

  public async update(
    userId: string,
    goalId: string,
    updateGoalDto: UpdateGoalDto,
  ): Promise<Goal> {
    const goal = await this.findOneOrFail(goalId);
    await this.getCategoryAndCheckOwnership(userId, goal.categoryId);

    if (updateGoalDto.title && updateGoalDto.title !== goal.title) {
      await this.ensureGoalIsUnique(goal.categoryId, updateGoalDto.title);
    }

    Object.assign(goal, updateGoalDto);

    if (goal.status === GoalStatus.NEEDS_CORRECTION) {
      const now = new Date();
      const hasValidFutureDate =
        goal.targetDate && new Date(goal.targetDate) > now;
      const hasSomeProgress = goal.progress > 0;

      if (hasValidFutureDate) {
        goal.status = hasSomeProgress
          ? GoalStatus.IN_PROGRESS
          : GoalStatus.PENDING;
      }
    }

    this.logger.log(`Goal updated successfully: ${goal.id}`);
    return await this.goalRepository.save(goal);
  }

  private async calculateProgress(
    goalId: string,
    userId: string,
  ): Promise<Progress> {
    this.logger.log(
      `Calculating progress for goal with ID: ${goalId} for user with ID: ${userId}`,
    );

    const goal = await this.findOneOrFail(goalId);
    await this.getCategoryAndCheckOwnership(userId, goal.categoryId);
    this.logger.log(`Goal found with ID: ${goalId} and ownership verified.`);

    const tasks = await this.taskRepository.find({ where: { goalId } });
    this.logger.log(`Fetched ${tasks.length} tasks for goal ID: ${goalId}`);

    const completedTasks = tasks.filter(
      (task) => task.status === TaskStatus.COMPLETED,
    );
    const totalTasks = tasks.length;

    let totalWeight = 0;
    let completedWeight = 0;

    tasks.forEach((task) => {
      totalWeight += task.importance;
      if (task.status === TaskStatus.COMPLETED) {
        completedWeight += task.importance;
      }
    });
    this.logger.log(
      `Calculated total weight: ${totalWeight} and completed weight: ${completedWeight}`,
    );

    const progressPercentage = Math.round(
      totalWeight > 0 ? (completedWeight / totalWeight) * 100 : 0,
    );

    this.logger.log(
      `Progress for goal ID: ${goalId} is ${progressPercentage}% with ${completedTasks.length} completed tasks out of ${totalTasks}.`,
    );

    goal.progress = progressPercentage;

    if (goal.progress === 100) {
      goal.status = GoalStatus.COMPLETED;
      if (!goal.completedAt) {
        goal.completedAt = new Date();
      }
      this.logger.log(`Goal ID: ${goalId} marked as completed.`);
    } else if (completedTasks.length > 0) {
      goal.status = GoalStatus.IN_PROGRESS;
      goal.completedAt = null;
      this.logger.log(`Goal ID: ${goalId} marked as in progress.`);
    } else {
      goal.status = GoalStatus.PENDING;
      goal.completedAt = null;
      this.logger.log(`Goal ID: ${goalId} marked as pending.`);
    }

    await this.goalRepository.save(goal);
    this.logger.log(
      `Goal progress updated to ${goal.progress}% in the database.`,
    );

    return {
      allTasksCount: totalTasks,
      completedTasksCount: completedTasks.length,
      progressPercentage,
    };
  }

  private async ensureGoalIsUnique(
    categoryId: string,
    title: string,
  ): Promise<void> {
    const existingGoal = await this.goalRepository.findOne({
      where: { categoryId, title },
    });

    if (existingGoal) {
      this.logger.warn(
        `Goal with title "${title}" already exists in category ID: ${categoryId}`,
      );
      throw new ConflictException("Goal with this title already exists.");
    }
  }

  private async findOneOrFail(id: string): Promise<Goal> {
    this.logger.log(`Finding goal by ID: ${id}`);
    const goal = await this.goalRepository.findOneBy({ id });

    if (!goal) {
      this.logger.warn(`Goal not found with ID: ${id}`);
      throw new NotFoundException("Goal not found.");
    }

    return goal;
  }

  private async getCategoryAndCheckOwnership(
    userId: string,
    categoryId: string,
  ): Promise<Category> {
    this.logger.log(
      `Checking category ownership for user ID: ${userId}, category ID: ${categoryId}`,
    );

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException("Category not found.");
    }

    if (category.userId !== userId) {
      this.logger.warn(
        `User ${userId} is trying to access category ${categoryId} that doesn't belong to them`,
      );
      throw new ForbiddenException("You can only access your own categories.");
    }

    return category;
  }

  private async getPrioritizedTasks(
    userId: string,
    goalId: string,
  ): Promise<TaskWithDependencies[]> {
    const tasks = await this.taskRepository.find({
      where: { goalId },
    });

    const tasksWithNormalizedTime = tasks.map((task) => ({
      ...task,
      dependencies: (task.dependencies ?? []).map((id) => ({ id })),
      normalizedEstimatedTime: convertToMinutes(
        task.estimatedTime,
        task.estimatedTimeUnit,
      ),
    }));
    this.logger.log(`Tasks: ${tasksWithNormalizedTime}`);
    const sortedTasks = await this.topsisService.rankRespectingDependencies<
      (typeof tasksWithNormalizedTime)[0]
    >(tasksWithNormalizedTime, userId);

    const idToTitle = new Map<string, string>(
      tasks.map((t) => [t.id, t.title]),
    );

    return sortedTasks.map((t) => {
      const { normalizedEstimatedTime, ...orig } = t;
      return {
        ...orig,
        dependencies: (orig.dependencies || []).map((depId) => ({
          id: depId.id,
          title: idToTitle.get(depId.id) ?? "<Unknown>",
        })),
      };
    });
  }
}
