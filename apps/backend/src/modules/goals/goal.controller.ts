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

import { AiAssistantService } from "../../common/modules/ai-assistant/ai-assistant.service";
import { CreateTaskDto } from "../tasks/libs/dto/create-task.dto";
import { Task } from "../tasks/task.entity";

import { Goal } from "./goal.entity";
import { GoalService } from "./goal.service";
import { CreateGoalDto } from "./libs/dto/create-goal.dto";
import { GoalWithCategoryName } from "./libs/dto/goal-with-category-name";
import { GoalWithFullInfo } from "./libs/dto/goal-with-full-info";
import { UpdateGoalDto } from "./libs/dto/update-goal.dto";

@ApiTags("Goals")
@Controller("goals")
export class GoalController {
  constructor(
    private readonly aiAssistantService: AiAssistantService,
    private readonly goalService: GoalService,
  ) {}

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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [GoalWithCategoryName] })
  @ApiResponse({
    description: "Successfully retrieved the user's goals.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  async findAllByUserId(
    @CurrentUserId() userId: string,
  ): Promise<GoalWithCategoryName[]> {
    return await this.goalService.findAllByUserId(userId);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: GoalWithFullInfo })
  @ApiResponse({ description: "Successfully retrieved the goal.", status: 200 })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Goal not found.", status: 404 })
  async findOne(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<GoalWithFullInfo> {
    return await this.goalService.getGoalFullInfo(userId, id);
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

  @Post(":id/generate-tasks")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [CreateTaskDto] })
  @ApiResponse({ description: "Tasks generated successfully.", status: 200 })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Failed to request ChatGPT.", status: 503 })
  async generateTasksForGoal(
    @Param("id") goalId: string,
    @CurrentUserId() userId: string,
    @Body("goalDetails") goalDetails: string,
  ): Promise<CreateTaskDto[]> {
    const goal = await this.goalService.findOne(userId, goalId);
    return this.aiAssistantService.generateGoalTasks(goal.id, goalDetails);
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
