import { IsString } from "class-validator";

export class DuplicateImageDto {
  @IsString()
  boardId: string;
}
