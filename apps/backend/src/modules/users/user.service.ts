import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./libs/dto/create-user.dto";
import { PasswordService } from "../../common/modules/password/password.service";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  private readonly logger = new Logger("UserService");
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  public async findOneByEmail(email: string): Promise<User | null> {
    this.logger.log(`Finding user by email: ${email}`);
    return await this.userRepository.findOneBy({ email });
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user: ${createUserDto.email}`);
    const hashedPassword = await this.passwordService.hash(
      createUserDto.password,
    );
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    this.logger.log(`User created successfully: ${savedUser.id}`);
    return savedUser;
  }

  public async findOne(id: string): Promise<User | null> {
    this.logger.log(`Finding user by ID: ${id}`);
    return await this.userRepository.findOneBy({ id });
  }
}
