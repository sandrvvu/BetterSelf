import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PasswordService } from "../../common/modules/password/password.service";
import { AuthService } from "../auth/auth.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthController } from "../auth/auth.controller";
import { TypedConfigService, AuthConfigType } from "src/config";
import { AuthGuard } from "src/common/guards";

@Module({
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
  controllers: [UserController, AuthController],
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
