import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Title of the entry.",
    example: "Good morning",
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: "Content of the entry.",
    example: "Felt rested. Ready for the day.",
  })
  content: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: "ID of the goal associated with the entry.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
    nullable: true,
    required: false,
  })
  goalId?: string;
}
