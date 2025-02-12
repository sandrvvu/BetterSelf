import { registerAs } from "@nestjs/config";

export interface AuthConfigType {
  secret: string;
  expiresIn?: string;
}

export default registerAs(
  "auth",
  (): AuthConfigType => ({
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN ?? "24h",
  }),
);
