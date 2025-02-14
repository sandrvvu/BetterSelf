import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CurrentUserId } from "src/common/decorators";

import { UpdateUserDto } from "./libs/dto/update-user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiOkResponse({ type: User })
  @ApiResponse({
    description: "The user data has been successfully updated.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "User is not found.", status: 404 })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  async updateUser(
    @CurrentUserId() id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }
}
