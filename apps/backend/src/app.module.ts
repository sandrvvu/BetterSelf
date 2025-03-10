import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  AppConfig,
  appConfigSchema,
  AuthConfig,
  DatabaseConfig,
  TypedConfigService,
} from "./config";
import { CategoriesModule } from "./modules/categories/categories.module";
import { EntriesModule } from "./modules/entries/entries.module";
import { GoalsModule } from "./modules/goals/goals.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [AppConfig, AuthConfig, DatabaseConfig],
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: appConfigSchema,
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
  ],
  providers: [AppService],
})
export class AppModule {}
