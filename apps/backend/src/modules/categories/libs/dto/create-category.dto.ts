import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Health",
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Live a healthier life.",
  })
  description: string;
}
