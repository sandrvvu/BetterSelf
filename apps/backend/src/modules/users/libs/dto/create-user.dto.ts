import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
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
  password: string;
}
