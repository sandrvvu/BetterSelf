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
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CurrentUserId } from "src/common/decorators";

import { Goal } from "../goals/goal.entity";

import { Category } from "./category.entity";
import { CategoryService } from "./category.service";
import { CategoryWithGoalCounts } from "./libs/dto/category-with-goal-count";
import { CreateCategoryDto } from "./libs/dto/create-category.dto";
import { UpdateCategoryDto } from "./libs/dto/update-category.dto";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth("access-token")
  @ApiCreatedResponse({ type: Category })
  @ApiResponse({
    description: "The category has been successfully created.",
    status: 201,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  @ApiResponse({
    description: "Category with this name already exists.",
    status: 409,
  })
  async create(
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(userId, createCategoryDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ schema: { type: "boolean" } })
  @ApiResponse({
    description: "The category has been successfully deleted.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Category is not found.", status: 404 })
  async delete(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Boolean> {
    const category = await this.findOneOrFail(id);
    this.checkCategoryOwnership(category, userId);
    return await this.categoryService.delete(category);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [CategoryWithGoalCounts] })
  @ApiResponse({
    description: "Successfully retrieved the user's categories.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  async findAllByUserId(
    @CurrentUserId() userId: string,
  ): Promise<CategoryWithGoalCounts[]> {
    return await this.categoryService.findAllByUserId(userId);
  }

  @Get(":id/goals")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [Goal] })
  @ApiResponse({
    description: "Successfully retrieved goals for the category.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Category not found.", status: 404 })
  async findGoalsByCategory(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Goal[]> {
    const category = await this.findOneOrFail(id);
    this.checkCategoryOwnership(category, userId);
    return await this.categoryService.findGoalsByCategory(id);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: Category })
  @ApiResponse({
    description: "Successfully retrieved the category.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Category is not found.", status: 404 })
  async findOne(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Category> {
    const category = await this.findOneOrFail(id);
    this.checkCategoryOwnership(category, userId);
    return category;
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: Category })
  @ApiResponse({
    description: "The category has been successfully updated.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Category not found.", status: 404 })
  @ApiResponse({
    description: "Category with this name already exists.",
    status: 409,
  })
  async update(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.findOneOrFail(id);
    this.checkCategoryOwnership(category, userId);
    return await this.categoryService.update(category, updateCategoryDto);
  }

  private checkCategoryOwnership(category: Category, userId: string): void {
    if (category.userId !== userId) {
      throw new ForbiddenException("You can only access your own categories");
    }
  }

  private async findOneOrFail(id: string): Promise<Category> {
    const category = await this.categoryService.findOne(id);

    if (!category) {
      throw new NotFoundException("Category not found.");
    }

    return category;
  }
}
