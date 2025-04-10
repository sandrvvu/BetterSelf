import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ReflectionPromptDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's reflection input prompt.",
    example: "I've been thinking a lot lately about my career direction.",
  })
  content: string;
}
