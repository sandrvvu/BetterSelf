import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

import { TimeUnit } from "../../task.entity";

export class CreateTaskDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: "ID of the goal to which the task belongs.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  goalId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Title of the task.",
    example: "Schedule team meeting to discuss project updates.",
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Detailed description of the task.",
    example: "Send out calendar invite and prepare agenda.",
    required: false,
  })
  description?: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: "Priority level of the task (1 to 5).",
    example: 3,
  })
  priority: number;

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
