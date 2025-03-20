import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class ProgressDto {
  @IsInt()
  @ApiProperty({
    description: "Total number of tasks for the goal.",
    example: 5,
  })
  allTasksCount: number;

  @IsInt()
  @ApiProperty({
    description: "Number of completed tasks for the goal.",
    example: 3,
  })
  completedTasksCount: number;

  @IsInt()
  @ApiProperty({
    description: "Percentage of completed tasks relative to the total tasks.",
    example: 60,
  })
  progressPercentage: number;
}
