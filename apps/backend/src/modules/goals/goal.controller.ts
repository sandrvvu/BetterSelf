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
} from "@nestjs/swagger";

import { CurrentUserId } from "src/common/decorators";

import { Goal } from "./goal.entity";
import { GoalService } from "./goal.service";
import { CreateGoalDto } from "./libs/dto/create-goal.dto";
import { UpdateGoalDto } from "./libs/dto/update-goal.dto";

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
  @ApiResponse({ description: "Goal not found.", status: 404 })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  async findOne(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Goal> {
    return await this.goalService.findOne(userId, id);
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
