import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: "angel@gmail.com",
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Angel",
  })
  name: string;

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
    example: "777777A#",
  })
  password: string;
}
