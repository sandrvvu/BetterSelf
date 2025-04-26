import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
} from "class-validator";

import { GoalPriority, GoalStatus } from "../../goal.entity";

export class UpdateGoalDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Title of the goal.",
    example: "Master TypeScript",
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Detailed description of the goal.",
    example: "Complete advanced TypeScript course and build a project.",
  })
  description?: string;

  @IsOptional()
  @IsEnum(GoalPriority)
  @ApiProperty({
    description: "Priority level of the goal.",
    enum: GoalPriority,
    example: GoalPriority.LOW,
  })
  priority?: GoalPriority;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: "Target completion date for the goal.",
    example: "2026-06-30",
  })
  targetDate?: Date;

  @IsOptional()
  @IsEnum(GoalStatus)
  @ApiProperty({
    description: "Current status of the goal.",
    example: GoalStatus.COMPLETED,
  })
  status?: GoalStatus;
}
