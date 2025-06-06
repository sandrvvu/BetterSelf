import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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

import { UpdateTopsisSettingsDto } from "./libs/dto/update-topsis-settings.dto";
import { UpdateUserDto } from "./libs/dto/update-user.dto";
import { TopsisSettings } from "./topsis-settings.entity";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ schema: { type: "boolean" } })
  @ApiResponse({
    description: "The user has been successfully deleted.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "User is not found.", status: 404 })
  async delete(@CurrentUserId() id: string): Promise<boolean> {
    return await this.userService.delete(id);
  }

  @Get("topsis-settings")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TopsisSettings })
  @ApiBearerAuth("access-token")
  @ApiResponse({
    description: "Successfully retrieved user's topsis settings.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "User is not found.", status: 404 })
  async getTopsisSettings(
    @CurrentUserId() id: string,
  ): Promise<TopsisSettings> {
    return await this.userService.getTopsisSettings(id);
  }

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
  async update(
    @CurrentUserId() id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Put("topsis-settings")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiBody({
    type: UpdateTopsisSettingsDto,
  })
  @ApiOkResponse({ type: User })
  @ApiResponse({
    description: "The user's topsis setting shas been successfully updated.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "User is not found.", status: 404 })
  async updateTopsisSettings(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateTopsisSettingsDto,
  ) {
    return this.userService.updateTopsisSettings(userId, dto);
  }
}
