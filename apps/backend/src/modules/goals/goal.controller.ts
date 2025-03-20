import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
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

import { Task } from "../tasks/task.entity";

import { Goal } from "./goal.entity";
import { GoalService } from "./goal.service";
import { CreateGoalDto } from "./libs/dto/create-goal.dto";
import { ProgressDto } from "./libs/dto/progress.dto";
import { UpdateGoalDto } from "./libs/dto/update-goal.dto";

@ApiTags("Goals")
@Controller("goals")
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth("access-token")
  @ApiCreatedResponse({ type: Goal })
  @ApiResponse({
    description: "The goal has been successfully created.",
    status: 201,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Category not found.", status: 404 })
  @ApiResponse({
    description: "Goal with this name already exists.",
    status: 409,
  })
  async create(
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) createGoalDto: CreateGoalDto,
  ): Promise<Goal> {
    return await this.goalService.create(userId, createGoalDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ schema: { type: "boolean" } })
  @ApiResponse({
    description: "The goal has been successfully deleted.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Goal not found.", status: 404 })
  async delete(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<boolean> {
    return await this.goalService.delete(userId, id);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: Goal })
  @ApiResponse({ description: "Successfully retrieved the goal.", status: 200 })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Goal not found.", status: 404 })
  async findOne(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Goal> {
    return await this.goalService.findOne(userId, id);
  }

  @Get(":id/tasks")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [Task] })
  @ApiResponse({
    description: "Successfully retrieved tasks for the goal.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Goal not found.", status: 404 })
  async findTasksByGoal(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Task[]> {
    return await this.goalService.findTasksByGoal(id, userId);
  }

  @Get(":id/progress")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: ProgressDto })
  @ApiResponse({
    description: "Successfully calculated the goal progress.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Goal not found.", status: 404 })
  async getGoalProgress(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<ProgressDto> {
    return await this.goalService.calculateProgress(id, userId);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: Goal })
  @ApiResponse({
    description: "The goal has been successfully updated.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Goal not found.", status: 404 })
  @ApiResponse({
    description: "Goal with this name already exists.",
    status: 409,
  })
  async update(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) updateGoalDto: UpdateGoalDto,
  ): Promise<Goal> {
    return await this.goalService.update(userId, id, updateGoalDto);
  }
}
