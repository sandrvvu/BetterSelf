import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ReflectionPreviewDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: "ID of the reflection.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  id: string;

  @IsDateString()
  @ApiProperty({
    description: "Creation date for the reflection.",
    example: "2026-06-30",
  })
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Preview text of the reflection.",
    example: "Felt rested. Ready for the day.",
  })
  previewText: string;
}
