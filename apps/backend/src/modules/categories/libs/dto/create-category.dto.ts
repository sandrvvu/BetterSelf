import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Name of the category.",
    example: "Health",
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Description of the category.",
    example: "Live a healthier life.",
  })
  description?: string;
}
