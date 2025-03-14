import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
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
  @Expose()
  @ApiProperty({
    description: "Detailed description of the task.",
    example: "Include key metrics and project updates.",
  })
  description?: string;

  @Column("integer", { default: 1 })
  @IsInt()
  @Min(1)
  @Max(5)
  @Expose()
  @ApiProperty({
    description: "Priority level of the task (1 to 5).",
    example: 2,
  })
  priority: number;

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

  @Column("integer", { nullable: true })
  @IsOptional()
  @Min(1)
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
