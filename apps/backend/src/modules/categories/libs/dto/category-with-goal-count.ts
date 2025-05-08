import { ApiProperty } from "@nestjs/swagger";

import { Category } from "../../category.entity";

export class CategoryWithGoalCounts extends Category {
  @ApiProperty({
    description: "Total number of goals for the category.",
    type: "number",
  })
  allGoals: number;

  @ApiProperty({
    description: "Number of completed goals for the category.",
    type: "number",
  })
  completedGoals: number;
}
