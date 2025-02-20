import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PasswordService } from "../../common/modules/password/password.service";

import { CreateUserDto } from "./libs/dto/create-user.dto";
import { UpdateUserDto } from "./libs/dto/update-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  private readonly logger = new Logger("UserService");
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

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

  public async delete(id: string): Promise<boolean> {
    const user = await this.findOne(id);

    if (!user) {
      this.logger.warn(
        `Attempted to delete a non-existent user with ID: ${id}`,
      );
      throw new NotFoundException();
    }

    const deletedUser = await this.userRepository.remove(user);

    this.logger.log(`User deleted successfully: ${id}`);
    return Boolean(deletedUser);
  }

  public async findOne(id: string): Promise<User | null> {
    this.logger.log(`Finding user by ID: ${id}`);
    return await this.userRepository.findOneBy({ id });
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    this.logger.log(`Finding user by email: ${email}`);
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      this.logger.warn(`User not found with ID: ${id}`);
      throw new NotFoundException();
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.password) {
      const hashedPassword = await this.passwordService.hash(
        updateUserDto.password,
      );
      user.password = hashedPassword;
    }

    await this.userRepository.save(user);

    this.logger.log(`User data was updated successfully: ${id}`);
    return user;
  }
}
