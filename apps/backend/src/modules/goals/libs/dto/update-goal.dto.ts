import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsUUID,
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
    description: "Updated title of the goal.",
    example: "Master TypeScript",
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Updated description of the goal.",
    example: "Complete advanced TypeScript course and build a project.",
  })
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: "Updated priority level (1 to 5).",
    example: 2,
  })
  priority?: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: "Updated target date for goal completion.",
    example: "2026-06-30",
  })
  targetDate?: Date;

  @IsOptional()
  @IsEnum(GoalStatus)
  @ApiProperty({
    description: "Updated goal status.",
    example: GoalStatus.COMPLETED,
  })
  status?: GoalStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  @ApiProperty({
    description: "Updated goal progress percentage (0 to 100).",
    example: 75,
  })
  progress?: number;
}
