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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { Public } from "src/common/decorators";

import { CreateUserDto } from "../users/libs/dto/create-user.dto";
import { User } from "../users/user.entity";

import { AuthService } from "./auth.service";
import { AuthRequest } from "./libs/dto/auth.request";
import { LoginDto } from "./libs/dto/login.dto";
import { LoginResponse } from "./libs/dto/login.response";

@ApiTags("Auth")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: "excludeAll" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginDto,
  })
  @ApiOkResponse({ type: LoginResponse })
  @ApiResponse({
    description: "User logged in successfully.",
    status: 200,
  })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  @ApiResponse({ description: "Invalid credentials.", status: 401 })
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<LoginResponse> {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Get("profile")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: User })
  @ApiResponse({
    description: "User  logged in successfully.",
    status: 200,
  })
  @ApiResponse({ description: "User is not found.", status: 404 })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  async profile(@Request() request: AuthRequest): Promise<User> {
    return await this.authService.profile(request);
  }

  @Post("register")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiCreatedResponse({ type: LoginResponse })
  @ApiResponse({
    description: "The user has been successfully registred.",
    status: 201,
  })
  @ApiResponse({
    description: "Email already exists in the system.",
    status: 409,
  })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<LoginResponse> {
    return await this.authService.register(createUserDto);
  }
}
