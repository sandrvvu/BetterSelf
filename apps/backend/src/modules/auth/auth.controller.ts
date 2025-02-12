import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Request,
  HttpStatus,
  Post,
  SerializeOptions,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/libs/dto/create-user.dto";
import { User } from "../users/user.entity";
import { LoginResponse } from "./libs/dto/login.response";
import { LoginDto } from "./libs/dto/login.dto";
import { Public } from "src/common/decorators";
import { AuthRequest } from "./libs/dto/auth.request";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: "excludeAll" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post("login")
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<LoginResponse> {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return new LoginResponse({ accessToken });
  }

  @Get("profile")
  @HttpCode(HttpStatus.OK)
  async profile(@Request() request: AuthRequest): Promise<User> {
    return this.authService.profile(request);
  }
}
