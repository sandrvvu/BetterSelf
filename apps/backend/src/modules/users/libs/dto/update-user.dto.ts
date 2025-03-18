import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  MinLength,
  Matches,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Name of the user.",
    example: "Andriana",
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Matches(/[A-Z]/, {
    message: "Password must contain at least 1 uppercase letter",
  })
  @Matches(/[0-9]/, {
    message: "Password must contain at least 1 number",
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: "Password must contain at least 1 special character",
  })
  @ApiProperty({
    description: "Password of the user.",
    example: "skyBlue8#",
    required: false,
  })
  password?: string;
}
