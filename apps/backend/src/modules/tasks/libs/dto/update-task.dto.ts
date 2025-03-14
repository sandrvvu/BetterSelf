import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
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
    description: "Priority level of the task (1 to 5).",
    example: 3,
    required: false,
  })
  priority?: number;

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
