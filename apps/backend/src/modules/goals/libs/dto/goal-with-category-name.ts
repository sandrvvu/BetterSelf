import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

import { Goal } from "../../goal.entity";

export class GoalWithCategoryName extends Goal {
  @IsString()
  @ApiProperty({ description: "The name of the category." })
  categoryName: string;
}
