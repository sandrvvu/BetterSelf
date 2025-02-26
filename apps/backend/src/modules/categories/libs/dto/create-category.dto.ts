import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Health",
  })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Live a healthier life.",
  })
  description: string;
}
