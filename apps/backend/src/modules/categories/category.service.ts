import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Category } from "./category.entity";
import { CreateCategoryDto } from "./libs/dto/create-category.dto";
import { UpdateCategoryDto } from "./libs/dto/update-category.dto";

@Injectable()
export class CategoryService {
  private readonly logger = new Logger("CategoryService");
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async create(
    userId: string,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    this.logger.log(
      `Creating category "${createCategoryDto.name}" for user with ID: ${userId}`,
    );

    await this.ensureCategoryIsUnique(userId, createCategoryDto.name);

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      userId,
    });

    const savedCategory = await this.categoryRepository.save(category);
    this.logger.log(`Category created successfully: ${savedCategory.id}`);
    return savedCategory;
  }

  public async delete(category: Category): Promise<boolean> {
    const deletedCategory = await this.categoryRepository.remove(category);

    this.logger.log(`Category deleted successfully: ${deletedCategory.id}`);
    return Boolean(deletedCategory);
  }

  public async findAllByUserId(userId: string): Promise<Category[]> {
    const categories = await this.categoryRepository.findBy({ userId });

    if (!categories.length) {
      this.logger.warn(`No categories found for userId: ${userId}`);
    }

    return categories;
  }

  public async findOne(id: string): Promise<Category> {
    this.logger.log(`Finding category by ID: ${id}`);
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      this.logger.warn(`Category not found with ID: ${id}`);
      throw new NotFoundException("Category not found.");
    }

    return category;
  }

  public async update(
    category: Category,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
      await this.ensureCategoryIsUnique(
        category.userId,
        updateCategoryDto.name,
      );
    }
    Object.assign(category, updateCategoryDto);

    this.logger.log(`Category updated successfully: ${category.id}`);
    return await this.categoryRepository.save(category);
  }

  private async ensureCategoryIsUnique(
    userId: string,
    name: string,
  ): Promise<void> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name, userId },
    });

    if (existingCategory) {
      this.logger.warn(
        `Category with name "${name}" already exists for user ID: ${userId}`,
      );
      throw new ConflictException("Category with this name already exists.");
    }
  }
}
