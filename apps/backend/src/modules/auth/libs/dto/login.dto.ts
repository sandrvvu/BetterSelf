import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Email address of the user.",
    example: "blair@gmail.com",
  })
  email: string;

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
  @Expose()
  @ApiProperty({
    description: "Password of the user.",
    example: "Blair1#",
  })
  password: string;
}
