import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

import { Category } from "../../category.entity";

export class CategoryWithGoalCountsDto extends Category {
  @IsNumber()
  @ApiProperty({ description: "Total number of goals for the category." })
  allGoals: number;

  @IsNumber()
  @ApiProperty({ description: "Number of completed goals for the category." })
  completedGoals: number;
}
