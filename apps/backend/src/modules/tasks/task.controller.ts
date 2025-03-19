import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CurrentUserId } from "src/common/decorators";

import { CreateTaskDto } from "./libs/dto/create-task.dto";
import { UpdateTaskDto } from "./libs/dto/update-task.dto";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";

@ApiTags("Tasks")
@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth("access-token")
  @ApiCreatedResponse({ type: Task })
  @ApiResponse({
    description: "The task has been successfully created.",
    status: 201,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  async create(
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.taskService.create(userId, createTaskDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ schema: { type: "boolean" } })
  @ApiResponse({
    description: "The task has been successfully deleted.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Task not found.", status: 404 })
  async delete(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<boolean> {
    return await this.taskService.delete(userId, id);
  }

  @Get("available-dependencies")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [Task] })
  @ApiResponse({
    description: "Successfully retrieved available tasks.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  async findAllAvailableDependencies(
    @CurrentUserId() userId: string,
    @Query("goalId") goalId: string,
    @Query("taskId") taskId?: string,
  ): Promise<Task[]> {
    return await this.taskService.getAvailableDependencies(
      userId,
      goalId,
      taskId,
    );
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: Task })
  @ApiResponse({ description: "Successfully retrieved the task.", status: 200 })
  @ApiResponse({ description: "Task not found.", status: 404 })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  async findOne(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Task> {
    return await this.taskService.findOne(userId, id);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: Task })
  @ApiResponse({
    description: "The task has been successfully updated.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Task not found.", status: 404 })
  async update(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.update(userId, id, updateTaskDto);
  }
}
