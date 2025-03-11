import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateVisionBoardDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "My career",
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Focusing on professional development and advancement.",
  })
  description: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
    nullable: true,
    required: false,
  })
  goalId?: string;
}
