import { ApiProperty } from "@nestjs/swagger";

import { Goal } from "../../goal.entity";

export class GoalWithCategoryName extends Goal {
  @ApiProperty({ description: "The name of the category." })
  categoryName: string;
}
