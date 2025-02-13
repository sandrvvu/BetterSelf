import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
