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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ strategy: "excludeAll" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiCreatedResponse({ type: User })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully registred.",
  })
  @ApiResponse({
    status: 409,
    description: "Email already exists in the system.",
  })
  @ApiResponse({ status: 400, description: "Invalid data type provided." })
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post("login")
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginDto,
  })
  @ApiOkResponse({ type: LoginResponse })
  @ApiResponse({
    status: 200,
    description: "User  logged in successfully.",
  })
  @ApiResponse({ status: 400, description: "Invalid data type provided." })
  @ApiResponse({ status: 401, description: "Invalid credentials." })
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<LoginResponse> {
    const accessToken = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return new LoginResponse({ accessToken });
  }

  @Get("profile")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: User })
  @ApiResponse({
    status: 200,
    description: "User  logged in successfully.",
  })
  @ApiResponse({ status: 404, description: "User is not found." })
  @ApiResponse({ status: 401, description: "Unauthorized." })
  async profile(@Request() request: AuthRequest): Promise<User> {
    return this.authService.profile(request);
  }
}
