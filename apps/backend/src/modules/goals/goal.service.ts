import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Category } from "../categories/category.entity";
import { Task } from "../tasks/task.entity";

import { Goal } from "./goal.entity";
import { CreateGoalDto } from "./libs/dto/create-goal.dto";
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

  public async findOne(userId: string, goalId: string): Promise<Goal> {
    const goal = await this.findOneOrFail(goalId);
    await this.getCategoryAndCheckOwnership(userId, goal.categoryId);
    return goal;
  }

  public async findTasksByGoal(
    goalId: string,
    userId: string,
  ): Promise<Task[]> {
    this.logger.log(`Finding tasks for goal with ID: ${goalId}`);

    const goal = await this.findOneOrFail(goalId);
    await this.getCategoryAndCheckOwnership(userId, goal.categoryId);

    if (!goal) {
      this.logger.warn(`Goal not found with ID: ${goalId}`);
    }

    const tasks = await this.taskRepository.find({
      where: { goalId },
    });

    return tasks;
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
    this.logger.log(`Goal updated successfully: ${goal.id}`);
    return await this.goalRepository.save(goal);
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
}
