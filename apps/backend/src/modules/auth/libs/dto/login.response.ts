import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

import { User } from "src/modules/users/user.entity";

export class LoginResponse {
  constructor(private readonly partial?: Partial<LoginResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "JSON Web Token (JWT) for authenticated user access.",
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZjIwMjFjOS01OWU3LTQ4NWMtOTM0Yy0wNTg3MTZmY2EzNTgiLCJpYXQiOjE3NDE5NTQzMzUsImV4cCI6MTc0MjA0MDczNX0.QihsGKDTvAeYYHuk3H74kCEqGFzsV0nbvH95IeEWw-I",
  })
  accessToken: string;

  @Type(() => User)
  @Expose()
  @ApiProperty({
    description: "Information about the authenticated user.",
    type: User,
  })
  user: User;
}
