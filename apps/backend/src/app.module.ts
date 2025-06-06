import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  AppConfig,
  AppConfigSchema,
  AuthConfig,
  AwsConfig,
  DatabaseConfig,
  OpenAIConfig,
  TypedConfigService,
} from "./config";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { CronModule } from "./modules/cron/cron.module";
import { EntriesModule } from "./modules/entries/entries.module";
import { GoalsModule } from "./modules/goals/goals.module";
import { ReflectionsModule } from "./modules/reflections/reflections.module";
import { TasksModule } from "./modules/tasks/tasks.module";
import { UsersModule } from "./modules/users/users.module";
import { VisionBoardsModule } from "./modules/vision-boards/vision-boards.module";

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [AppConfig, AuthConfig, AwsConfig, DatabaseConfig, OpenAIConfig],
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
    AnalyticsModule,
    CategoriesModule,
    CronModule,
    EntriesModule,
    GoalsModule,
    TasksModule,
    ScheduleModule.forRoot(),
    ReflectionsModule,
    UsersModule,
    VisionBoardsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
