import { ApiProperty } from "@nestjs/swagger";

export class GoalOption {
  @ApiProperty({
    description: "Unique identifier of the goal.",
    example: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  })
  id: string;

  @ApiProperty({
    description: "Title of the goal.",
    example: "Learn a new language",
  })
  title: string;
}
