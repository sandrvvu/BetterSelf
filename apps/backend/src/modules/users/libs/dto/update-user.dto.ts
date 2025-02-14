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
    example: "Andriana",
    required: false,
  })
  readonly name?: string;

  @IsOptional()
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
    example: "skyBlue8#",
    required: false,
  })
  readonly password?: string;
}
