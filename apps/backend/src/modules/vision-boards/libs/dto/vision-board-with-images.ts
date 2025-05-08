import { ApiProperty } from "@nestjs/swagger";

export class VisionBoardWithImages {
  @ApiProperty({
    description: "Date and time the vision board was created.",
    format: "date-time",
    type: "string",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Description of the vision board.",
    type: "string",
  })
  description: string;

  @ApiProperty({
    description: "Optional Goal ID associated with the vision board.",
    format: "uuid",
    nullable: true,
    type: "string",
  })
  goalId: string | null;

  @ApiProperty({
    description: "Unique identifier of the vision board.",
    format: "uuid",
    type: "string",
  })
  id: string;

  @ApiProperty({
    description: "Array of images associated with the vision board.",
    items: {
      properties: {
        id: { format: "uuid", type: "string" },
        source: { format: "url", type: "string" },
      },
      type: "object",
    },
    type: "array",
  })
  images: {
    id: string;
    source: string;
  }[];

  @ApiProperty({ description: "Title of the vision board.", type: "string" })
  title: string;

  @ApiProperty({
    description: "Date and time the vision board was last updated.",
    format: "date-time",
    type: "string",
  })
  updatedAt: Date;

  @ApiProperty({
    description: "User ID associated with the vision board.",
    format: "uuid",
    type: "string",
  })
  userId: string;
}
