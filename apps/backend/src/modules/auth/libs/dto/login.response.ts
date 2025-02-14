import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class LoginResponse {
  constructor(private readonly partial?: Partial<LoginResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @ApiProperty()
  accessToken: string;
}
