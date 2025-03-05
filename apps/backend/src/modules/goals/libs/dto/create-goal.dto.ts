import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsUUID,
  IsDateString,
} from "class-validator";

import { GoalStatus } from "../../goal.entity";

export class CreateGoalDto {
  @ApiProperty({
    description: "ID of the category to which the goal belongs",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: "Title of the goal",
    example: "Complete the programming course",
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Detailed description of the goal",
    example: "Finish all course modules and pass the final exam.",
    required: false,
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Priority level (1 to 5)",
    example: 3,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  priority: number;

  @ApiProperty({
    description: "Target date for goal completion",
    example: "2025-12-31",
  })
  @IsDateString()
  targetDate: Date;

  @ApiProperty({
    default: GoalStatus.PENDING,
    description: "Status of the goal",
    enum: GoalStatus,
    example: GoalStatus.PENDING,
  })
  @IsEnum(GoalStatus)
  @IsOptional()
  status?: GoalStatus;
}
