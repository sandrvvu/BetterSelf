import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateEntryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Good morning",
    required: false,
  })
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Felt rested. Ready for the day.",
    required: false,
  })
  content: string;
}
