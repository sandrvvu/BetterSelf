import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEntryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Good morning",
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "Felt rested. Ready for the day.",
  })
  content: string;
}
