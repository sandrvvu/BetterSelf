import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  constructor(private readonly partial?: Partial<LoginResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @ApiProperty()
  accessToken: string;
}
