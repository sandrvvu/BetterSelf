import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateVisionBoardDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "My career",
    required: false,
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: "Focusing on professional development and advancement.",
    required: false,
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
