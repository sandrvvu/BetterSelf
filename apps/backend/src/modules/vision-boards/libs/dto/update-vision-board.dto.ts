import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateVisionBoardDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Title of the vision board.",
    example: "My career",
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Description of the vision board.",
    example: "Focusing on professional development and advancement.",
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: "ID of the goal associated with the vision board.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
    nullable: true,
    required: false,
  })
  goalId?: string;
}
