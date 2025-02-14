import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: "blair@gmail.com",
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Blair1#",
  })
  password: string;
}
