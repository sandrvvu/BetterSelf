import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as Joi from "joi";

import {
  AppConfigType,
  AuthConfigType,
  AwsConfigType,
  OpenAIConfigType,
} from ".";

export interface ConfigType {
  app: AppConfigType;
  database: TypeOrmModuleOptions;
  auth: AuthConfigType;
  aws: AwsConfigType;
  openai: OpenAIConfigType;
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
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_BUCKET_NAME: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().required(),
});
