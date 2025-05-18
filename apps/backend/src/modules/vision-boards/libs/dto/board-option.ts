import { ApiProperty } from "@nestjs/swagger";

export class BoardOption {
  @ApiProperty({
    description: "Unique identifier of the board.",
    example: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  })
  id: string;

  @ApiProperty({
    description: "Title of the board.",
    example: "Learn a new language",
  })
  title: string;
}
