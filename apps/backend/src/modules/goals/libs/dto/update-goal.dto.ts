import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  Min,
  Max,
  IsDateString,
} from "class-validator";

import { GoalStatus } from "../../goal.entity";

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
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: "Priority level of the goal (1 to 5).",
    example: 2,
  })
  priority?: number;

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
