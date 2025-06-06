import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

import { Entry } from "../../entry.entity";

export class EntryWithGoalDto extends Entry {
  @ApiProperty({
    description: "Title of the related goal.",
    type: "string",
  })
  @Expose()
  @Transform(({ obj }) => obj.goal?.title ?? null)
  goalTitle: string | null;
}
