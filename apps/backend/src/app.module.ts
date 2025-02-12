import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {
  AppConfig,
  appConfigSchema,
  AuthConfig,
  DatabaseConfig,
  TypedConfigService,
} from "./config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/users/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfig, AuthConfig, DatabaseConfig],
      validationSchema: appConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: TypedConfigService) => ({
        ...configService.get("database"),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
