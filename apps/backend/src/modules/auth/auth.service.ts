import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  Request,
  NotFoundException,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { PasswordService } from "../../common/modules/password/password.service";
import { CreateUserDto } from "../users/libs/dto/create-user.dto";
import { User } from "../users/user.entity";
import { UserService } from "../users/user.service";

import { AuthRequest } from "./libs/dto/auth.request";

@Injectable()
export class AuthService {
  private readonly logger = new Logger("AuthService");
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  public async login(email: string, password: string): Promise<string> {
    this.logger.log(`Login attempt for email: ${email}`);
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      this.logger.warn(`Login failed: Invalid credentials for ${email}`);
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!(await this.passwordService.verify(password, user.password))) {
      this.logger.warn(`Login failed: Invalid credentials for ${email}`);
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = this.generateToken(user);
    this.logger.log(`User logged in successfully: ${user.id}`);
    return token;
  }

  async profile(@Request() request: AuthRequest): Promise<User> {
    this.logger.log(`Fetching profile for user: ${request.user.sub}`);
    const user = await this.userService.findOne(request.user.sub);

    if (user) {
      return user;
    }

    this.logger.warn("Profile fetch failed: User not found");
    throw new NotFoundException();
  }

  public async register(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Registering user: ${createUserDto.email}`);
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      this.logger.warn("Registration failed: Email already exists");
      throw new ConflictException("Email already exists");
    }

    const user = await this.userService.create(createUserDto);
    this.logger.log(`User registered successfully: ${user.id}`);
    return user;
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
