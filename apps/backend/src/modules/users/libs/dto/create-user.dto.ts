import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: "Email address of the user.",
    example: "angel@gmail.com",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Name of the user.",
    example: "Angel",
  })
  name: string;

  @IsString()
  @IsNotEmpty()
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
    example: "777777A#",
  })
  password: string;
}
