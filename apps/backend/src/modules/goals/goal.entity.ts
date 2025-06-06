import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsUUID,
  IsString,
} from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Category } from "../categories/category.entity";
import { Entry } from "../entries/entry.entity";
import { Task } from "../tasks/task.entity";
import { VisionBoard } from "../vision-boards/vision-board.entity";

export enum GoalStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  NEEDS_CORRECTION = "needs_correction",
  ARCHIVED = "archived",
}

export enum GoalPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

@Entity()
export class Goal {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    description: "Unique identifier of the goal.",
    example: "b5f68e29-2c7d-4a6f-8a1b-3c8f98a45678",
  })
  id: string;

  @Column("uuid")
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "ID of the category associated with the goal.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  categoryId: string;

  @Column("varchar")
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Title of the goal.",
    example: "Complete the programming course",
  })
  title: string;

  @Column("text", { nullable: true })
  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    description: "Detailed description of the goal.",
    example: "Finish all course modules and pass the final exam.",
  })
  description?: string;

  @Column({
    enum: GoalPriority,
    type: "enum",
  })
  @IsEnum(GoalPriority)
  @Expose()
  @ApiProperty({
    description: "Priority level of the goal.",
    example: GoalPriority.MEDIUM,
  })
  priority: GoalPriority;

  @Column("date", { nullable: true })
  @IsOptional()
  @Expose()
  @ApiProperty({
    description: "Target completion date for the goal.",
    example: "2025-12-31",
  })
  targetDate?: Date;

  @Column({
    default: GoalStatus.PENDING,
    enum: GoalStatus,
    type: "enum",
  })
  @IsEnum(GoalStatus)
  @Expose()
  @ApiProperty({
    description: "Current status of the goal.",
    example: GoalStatus.IN_PROGRESS,
  })
  status: GoalStatus;

  @Column("integer", { default: 0 })
  @IsInt()
  @Min(0)
  @Max(100)
  @Expose()
  @ApiProperty({
    description: "Goal progress in percentage (0 to 100).",
    example: 50,
  })
  progress: number;

  @Column("date", { nullable: true })
  @Expose()
  @ApiProperty({
    description: "Completion date for the goal.",
    example: "2025-12-31",
  })
  completedAt: Date;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the goal was created.",
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the goal was last updated.",
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.goals, {
    nullable: false,
    onDelete: "CASCADE",
  })
  category: Category;

  @OneToMany(() => VisionBoard, (board) => board.goal)
  visionBoards: VisionBoard[];

  @OneToMany(() => Entry, (entry) => entry.goal)
  entries: Entry[];

  @OneToMany(() => Task, (task) => task.goal)
  tasks: Task[];
}
