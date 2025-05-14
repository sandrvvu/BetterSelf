import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Goal } from "../goals/goal.entity";

import { CreateTaskDto } from "./libs/dto/create-task.dto";
import { UpdateTaskDto } from "./libs/dto/update-task.dto";
import { Task } from "./task.entity";

@Injectable()
export class TaskService {
  private readonly logger = new Logger("TaskService");

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  public async create(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    this.logger.log(
      `Creating task "${createTaskDto.title}" for user with ID: ${userId}`,
    );

    const goal = await this.getGoalAndCheckOwnership(
      userId,
      createTaskDto.goalId,
    );

    const availableTasks = await this.getAvailableDependencies(
      userId,
      createTaskDto.goalId,
    );

    if (createTaskDto.dependencies && createTaskDto.dependencies.length > 0) {
      const invalidDependencies = createTaskDto.dependencies.filter(
        (depId) => !availableTasks.some((task) => task.id === depId),
      );

      if (invalidDependencies.length > 0) {
        this.logger.warn(
          `Invalid dependencies: ${invalidDependencies.join(", ")}`,
        );
        throw new BadRequestException("Some dependencies are not valid.");
      }
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      goalId: goal.id,
    });

    const savedTask = await this.taskRepository.save(task);
    this.logger.log(`Task created successfully: ${savedTask.id}`);
    return savedTask;
  }

  public async delete(userId: string, taskId: string): Promise<boolean> {
    const task = await this.findOneOrFail(taskId);
    await this.getTaskAndCheckOwnership(userId, taskId);

    const tasksWithDependency = await this.taskRepository.find({
      where: { goalId: task.goalId },
    });

    const updatedTasks = tasksWithDependency
      .filter((t) => t.dependencies?.includes(taskId))
      .map((t) => ({
        ...t,
        dependencies: t.dependencies.filter((depId) => depId !== taskId),
      }));

    await this.taskRepository.save(updatedTasks);

    const deletedTask = await this.taskRepository.remove(task);
    this.logger.log(`Task deleted successfully: ${deletedTask.id}`);
    return Boolean(deletedTask);
  }

  public async findAllByGoalId(goalId: string): Promise<Task[]> {
    this.logger.log(`Finding tasks of goal with ID: ${goalId}`);

    return await this.taskRepository.find({
      where: { goalId },
    });
  }

  public async findOne(userId: string, taskId: string): Promise<Task> {
    const task = await this.findOneOrFail(taskId);
    await this.getTaskAndCheckOwnership(userId, taskId);
    return task;
  }

  public async getAvailableDependencies(
    userId: string,
    goalId: string,
    taskId?: string,
  ): Promise<Task[]> {
    this.logger.log(`Fetching available dependency tasks for goal ${goalId}`);

    const goal = await this.getGoalAndCheckOwnership(userId, goalId);

    const tasks = await this.taskRepository.find({
      where: { goalId: goal.id },
    });

    if (taskId) {
      const currentTask = await this.findOne(userId, taskId);
      return tasks.filter(
        (task) =>
          task.id !== taskId && !task.dependencies?.includes(currentTask.id),
      );
    }

    return tasks;
  }

  public async update(
    userId: string,
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOneOrFail(taskId);
    await this.getTaskAndCheckOwnership(userId, taskId);

    const availableTasks = await this.getAvailableDependencies(
      userId,
      task.goalId,
      taskId,
    );

    if (updateTaskDto.dependencies && updateTaskDto.dependencies.length > 0) {
      const invalidDependencies = updateTaskDto.dependencies.filter(
        (depId) => !availableTasks.some((task) => task.id === depId),
      );

      if (invalidDependencies.length > 0) {
        this.logger.warn(
          `Invalid dependencies: ${invalidDependencies.join(", ")}`,
        );
        throw new BadRequestException("Some dependencies are not valid.");
      }
    }

    Object.assign(task, updateTaskDto);
    this.logger.log(`Task updated successfully: ${task.id}`);
    return await this.taskRepository.save(task);
  }

  private async findOneOrFail(id: string): Promise<Task> {
    this.logger.log(`Finding task by ID: ${id}`);
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      this.logger.warn(`Task not found with ID: ${id}`);
      throw new NotFoundException("Task not found.");
    }

    return task;
  }

  private async getGoalAndCheckOwnership(
    userId: string,
    goalId: string,
  ): Promise<Goal> {
    this.logger.log(
      `Checking ownership for goal ID: ${goalId} and user ID: ${userId}`,
    );

    const goal = await this.taskRepository.manager.findOne(Goal, {
      relations: ["category"],
      where: { id: goalId },
    });

    if (!goal) {
      throw new NotFoundException("Goal not found.");
    }

    if (goal.category.userId !== userId) {
      this.logger.warn(
        `User ${userId} tried to modify goal ${goalId} they don't own.`,
      );
      throw new ForbiddenException("You can only access your own goals.");
    }

    return goal;
  }

  private async getTaskAndCheckOwnership(
    userId: string,
    taskId: string,
  ): Promise<Task> {
    this.logger.log(
      `Checking ownership for task ID: ${taskId} and user ID: ${userId}`,
    );

    const task = await this.taskRepository.findOne({
      relations: ["goal", "goal.category"],
      where: { id: taskId },
    });

    if (!task) {
      this.logger.warn(`Task not found with ID: ${taskId}`);
      throw new NotFoundException("Task not found.");
    }

    if (task.goal.category.userId !== userId) {
      this.logger.warn(
        `User ${userId} tried to access task ${taskId} not belonging to them.`,
      );
      throw new ForbiddenException("You can only access your own tasks.");
    }

    return task;
  }
}
