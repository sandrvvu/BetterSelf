import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsString,
  IsUUID,
  IsArray,
} from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Goal } from "../goals/goal.entity";

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  OVERDUE = "overdue",
}

export enum TimeUnit {
  MINUTES = "minutes",
  HOURS = "hours",
  DAYS = "days",
  MONTHS = "months",
  YEARS = "years",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    description: "Unique identifier of the task.",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  id: string;

  @Column("uuid")
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "ID of the goal this task is associated with.",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  goalId: string;

  @Column("varchar")
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Title of the task.",
    example: "Prepare presentation slides for team meeting.",
  })
  title: string;

  @Column("text", { nullable: true })
  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty({
    description: "Detailed description of the task.",
    example: "Include key metrics and project updates.",
  })
  description?: string;

  @Column("integer")
  @IsInt()
  @Min(1)
  @Max(5)
  @Expose()
  @ApiProperty({
    description: "Importance level of the task (1 to 5).",
    example: 4,
  })
  importance: number;

  @Column("integer")
  @IsInt()
  @Min(1)
  @Max(5)
  @Expose()
  @ApiProperty({
    description: "Urgency level of the task (1 to 5).",
    example: 2,
  })
  urgency: number;

  @Column("integer")
  @IsInt()
  @Min(1)
  @Max(5)
  @Expose()
  @ApiProperty({
    description: "Difficulty level of the task (1 to 5).",
    example: 2,
  })
  difficulty: number;

  @Column("integer")
  @IsInt()
  @Min(0)
  @Max(100)
  @Expose()
  @ApiProperty({
    description: "Probability of success in percentage (0 to 100).",
    example: 50,
  })
  successProbability: number;

  @Column("simple-array", { nullable: true })
  @IsOptional()
  @IsArray()
  @IsUUID("all", { each: true })
  @Expose()
  @ApiProperty({
    description: "List of task dependencies (IDs of prerequisite tasks).",
    example: ["550e8400-e29b-41d4-a716-446655440000"],
  })
  dependencies?: string[];

  @Column("date", { nullable: true })
  @IsOptional()
  @Expose()
  @ApiProperty({
    description: "Target completion date for the task.",
    example: "2025-12-31",
  })
  targetDate?: Date;

  @Column("enum", {
    default: TaskStatus.PENDING,
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus)
  @Expose()
  @ApiProperty({
    description: "Current status of the task.",
    example: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @Column("float", { nullable: true })
  @IsOptional()
  @Expose()
  @ApiProperty({
    description: "Estimated time to complete the task (in estimatedTimeUnit).",
    example: 120,
  })
  estimatedTime?: number;

  @Column("enum", { default: TimeUnit.MINUTES, enum: TimeUnit })
  @IsEnum(TimeUnit)
  @Expose()
  @ApiProperty({
    description: "Unit of time for estimatedTime.",
    example: TimeUnit.HOURS,
  })
  estimatedTimeUnit: TimeUnit;

  @Column("date", { nullable: true })
  @Expose()
  @ApiProperty({
    description: "Completion date for the task.",
    example: "2025-12-31",
  })
  completedAt: Date;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the task was created.",
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the task was last updated.",
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @ManyToOne(() => Goal, (goal) => goal.tasks, {
    nullable: false,
    onDelete: "CASCADE",
  })
  goal: Goal;
}
