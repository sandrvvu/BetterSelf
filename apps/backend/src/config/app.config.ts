import { registerAs } from "@nestjs/config";

export interface AppConfigType {
  port: number;
  nodenv: string;
}

export default registerAs(
  "config",
  (): AppConfigType => ({
    port: parseInt(process.env.PORT ?? "8080"),
    nodenv: process.env.NODE_ENV,
  }),
);
