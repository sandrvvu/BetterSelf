import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  Request,
  NotFoundException,
} from "@nestjs/common";
import { UserService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/libs/dto/create-user.dto";
import { PasswordService } from "../../common/modules/password/password.service";
import { User } from "../users/user.entity";
import { AuthRequest } from "./libs/dto/auth.request";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  public async register(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto);
    const existingUser = await this.userService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const user = await this.userService.create(createUserDto);

    return user;
  }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!(await this.passwordService.verify(password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.generateToken(user);
  }

  async profile(@Request() request: AuthRequest): Promise<User> {
    const user = await this.userService.findOne(request.user.sub);

    if (user) {
      return user;
    }

    throw new NotFoundException();
  }

  private generateToken(user: User): string {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }
}
