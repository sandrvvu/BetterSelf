import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Health",
    required: false,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Live a healthier life.",
    required: false,
  })
  description: string;
}
