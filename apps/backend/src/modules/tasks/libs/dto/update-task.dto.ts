import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

import { TimeUnit } from "../../task.entity";

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Title of the task.",
    example: "Review and finalize project proposal.",
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Detailed description of the task.",
    example: "Incorporate feedback from stakeholders and ensure clarity.",
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: "Importance level of the task (1 to 5).",
    example: 3,
    required: false,
  })
  importance?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: "Urgency level of the task (1 to 5).",
    example: 2,
    required: false,
  })
  urgency?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: "Difficulty level of the task (1 to 5).",
    example: 1,
    required: false,
  })
  difficulty?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({
    description: "Probability of success in percentage (0 to 100).",
    example: 50,
    required: false,
  })
  successProbability?: number;

  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  @ApiProperty({
    description: "List of task dependencies (IDs of prerequisite tasks).",
    example: ["550e8400-e29b-41d4-a716-446655440000"],
    required: false,
  })
  dependencies?: string[];

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: "Target completion date for the task.",
    example: "2025-12-31",
    required: false,
  })
  targetDate?: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({
    description: "Estimated time to complete the task (in estimatedTimeUnit).",
    example: 120,
    required: false,
  })
  estimatedTime?: number;

  @IsOptional()
  @IsEnum(TimeUnit)
  @ApiProperty({
    description: "Unit of time for estimatedTime.",
    example: TimeUnit.HOURS,
    required: false,
  })
  estimatedTimeUnit?: TimeUnit;
}
