import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CurrentUserId } from "src/common/decorators";

import { ChatMessage } from "./chat-message.entity";
import { ReflectionPreviewDto } from "./libs/dto/reflection-preview.dto";
import { ReflectionWithMessagesDto } from "./libs/dto/reflection-with-messages.dto";
import { ReflectionPromptDto } from "./libs/dto/user-chat-input.dto";
import { Reflection } from "./reflection.entity";
import { ReflectionService } from "./reflection.service";

@ApiTags("Reflections")
@Controller("reflections")
export class ReflectionController {
  constructor(private readonly reflectionService: ReflectionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth("access-token")
  @ApiCreatedResponse({ type: Reflection })
  @ApiResponse({
    description: "The reflection has been successfully created.",
    status: 201,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  async create(@CurrentUserId() userId: string): Promise<Reflection> {
    return await this.reflectionService.create(userId);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ schema: { type: "boolean" } })
  @ApiResponse({
    description: "The reflection has been successfully deleted.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Reflection is not found.", status: 404 })
  async delete(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Boolean> {
    const reflection = await this.findOneOrFail(id);
    this.checkReflectionOwnership(reflection, userId);
    return await this.reflectionService.delete(reflection);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [ReflectionPreviewDto] })
  @ApiResponse({
    description: "Successfully retrieved the user's reflections.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  async findAllByUserId(
    @CurrentUserId() userId: string,
  ): Promise<ReflectionPreviewDto[]> {
    return await this.reflectionService.findAllByUserId(userId);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: ReflectionWithMessagesDto })
  @ApiResponse({
    description: "Successfully retrieved the reflection.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Reflection is not found.", status: 404 })
  async findOne(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<ReflectionWithMessagesDto> {
    const reflection = await this.reflectionService.findOneWithMessages(id);
    this.checkReflectionOwnership(reflection, userId);
    return reflection;
  }

  @Post(":id/chat")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: ChatMessage })
  @ApiResponse({
    description: "Successfully received the AI response for reflection.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Reflection is not found.", status: 404 })
  @ApiResponse({ description: "Failed to request to ChatGPT.", status: 503 })
  async reflect(
    @Param("id") id: string,
    @Body(ValidationPipe) message: ReflectionPromptDto,
    @CurrentUserId() userId: string,
  ): Promise<ChatMessage> {
    const reflection = await this.reflectionService.findOneWithMessages(id);
    this.checkReflectionOwnership(reflection, userId);
    return await this.reflectionService.handleReflectionMessage(
      reflection,
      message.content,
    );
  }

  private checkReflectionOwnership(
    reflection: Reflection,
    userId: string,
  ): void {
    if (reflection.userId !== userId) {
      throw new ForbiddenException("You can only access your own reflections");
    }
  }

  private async findOneOrFail(id: string): Promise<Reflection> {
    const reflection = await this.reflectionService.findOne(id);

    if (!reflection) {
      throw new NotFoundException("Reflection not found.");
    }

    return reflection;
  }
}
