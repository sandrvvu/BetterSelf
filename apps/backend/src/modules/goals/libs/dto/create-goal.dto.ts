import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUUID,
  IsDateString,
  IsString,
} from "class-validator";

import { GoalPriority, GoalStatus } from "../../goal.entity";

export class CreateGoalDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: "ID of the category to which the goal belongs.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Title of the goal.",
    example: "Complete the programming course",
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Detailed description of the goal.",
    example: "Finish all course modules and pass the final exam.",
    required: false,
  })
  description?: string;

  @IsEnum(GoalPriority)
  @ApiProperty({
    description: "Priority level of the goal.",
    enum: GoalPriority,
    example: GoalPriority.LOW,
  })
  priority: GoalPriority;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: "Target completion date for the goal.",
    example: "2025-12-31",
  })
  targetDate?: Date;

  @IsOptional()
  @IsEnum(GoalStatus)
  @ApiProperty({
    description: "Current status of the goal.",
    enum: GoalStatus,
    example: GoalStatus.PENDING,
  })
  status?: GoalStatus;
}
