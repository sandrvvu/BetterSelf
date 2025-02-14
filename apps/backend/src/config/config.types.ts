import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Joi from "joi";

import { AppConfigType } from "./app.config";
import { AuthConfigType } from "./auth.config";

export interface ConfigType {
  app: AppConfigType;
  database: TypeOrmModuleOptions;
  auth: AuthConfigType;
}

export default Joi.object({
  PORT: Joi.number().default(8080),
  NODE_ENV: Joi.string().default("development"),
  DATABASE_HOST: Joi.string().default("localhost"),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default("24h"),
});
