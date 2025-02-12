import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config();

const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  host: configService.get("DATABASE_HOST"),
  port: configService.get("DATABASE_PORT"),
  username: configService.get("DATABASE_USER"),
  password: configService.get("DATABASE_PASSWORD"),
  database: configService.get("DATABASE_NAME"),
  dropSchema: false,
  synchronize: configService.get("nodenv") === "development",
  logging: configService.get("nodenv") === "development",
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/db/migrations/*{.ts,.js}`],
  migrationsTableName: 'migration_table',
});
