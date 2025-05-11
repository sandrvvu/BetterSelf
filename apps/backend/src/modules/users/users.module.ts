import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthGuard } from "src/common/guards";
import { TypedConfigService, AuthConfigType } from "src/config";

import { PasswordService } from "../../common/services/password/password.service";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";

import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController, AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: TypedConfigService) => ({
        secret: config.get<AuthConfigType>("auth")?.secret,
        signOptions: {
          expiresIn: config.get<AuthConfigType>("auth")?.expiresIn,
        },
      }),
    }),
  ],
  providers: [
    UserService,
    PasswordService,
    AuthService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class UsersModule {}
