import { IsArray, IsBoolean, IsNumber } from "class-validator";

export class UpdateTopsisSettingsDto {
  @IsArray()
  @IsNumber({}, { each: true })
  weights: number[];

  @IsArray()
  @IsBoolean({ each: true })
  isBenefit: boolean[];
}
