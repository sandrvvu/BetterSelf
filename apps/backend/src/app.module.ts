import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  AppConfig,
  AppConfigSchema,
  AuthConfig,
  AwsConfig,
  DatabaseConfig,
  TypedConfigService,
} from "./config";
import { CategoriesModule } from "./modules/categories/categories.module";
import { EntriesModule } from "./modules/entries/entries.module";
import { GoalsModule } from "./modules/goals/goals.module";
import { UsersModule } from "./modules/users/users.module";
import { VisionBoardsModule } from "./modules/vision-boards/vision-boards.module";

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [AppConfig, AuthConfig, AwsConfig, DatabaseConfig],
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: AppConfigSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get("database"),
      }),
    }),
    CategoriesModule,
    EntriesModule,
    GoalsModule,
    UsersModule,
    VisionBoardsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
