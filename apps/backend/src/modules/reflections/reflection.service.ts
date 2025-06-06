import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AiAssistantService } from "../../common/services/ai-assistant/ai-assistant.service";

import { ChatMessage, ChatMessageRole } from "./chat-message.entity";
import { ReflectionPreviewDto } from "./libs/dto/reflection-preview.dto";
import { ReflectionWithMessagesDto } from "./libs/dto/reflection-with-messages.dto";
import { Reflection } from "./reflection.entity";

@Injectable()
export class ReflectionService {
  private readonly logger = new Logger("ReflectionService");
  constructor(
    @InjectRepository(Reflection)
    private reflectionRepository: Repository<Reflection>,
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>,
    private aiAssistantService: AiAssistantService,
  ) {}

  public async create(userId: string): Promise<Reflection> {
    this.logger.log(`Creating reflection for user with ID: ${userId}`);

    const reflection = this.reflectionRepository.create({
      userId,
    });

    const savedReflection = await this.reflectionRepository.save(reflection);
    this.logger.log(`Reflection created successfully: ${savedReflection.id}`);
    return savedReflection;
  }

  public async delete(reflection: Reflection): Promise<boolean> {
    const deletedReflection =
      await this.reflectionRepository.remove(reflection);

    this.logger.log(`Reflection deleted successfully: ${deletedReflection.id}`);
    return Boolean(deletedReflection);
  }

  public async findAllByUserId(
    userId: string,
  ): Promise<ReflectionPreviewDto[]> {
    const reflections = await this.reflectionRepository.find({
      order: { createdAt: "DESC" },
      where: { userId },
    });

    if (!reflections.length) {
      this.logger.warn(`No reflections found for userId: ${userId}`);
    }

    const previews: ReflectionPreviewDto[] = [];

    for (const reflection of reflections) {
      const firstMessage = await this.chatMessageRepository.findOne({
        order: { createdAt: "ASC" },
        where: {
          role: ChatMessageRole.USER,
          sessionId: reflection.id,
        },
      });

      previews.push({
        createdAt: reflection.createdAt,
        id: reflection.id,
        previewText: firstMessage?.content || "New reflection",
      });
    }

    return previews;
  }

  public async findOne(id: string): Promise<Reflection> {
    this.logger.log(`Finding reflection by ID: ${id}`);
    const reflection = await this.reflectionRepository.findOne({
      where: { id },
    });

    if (!reflection) {
      this.logger.warn(`Reflection not found with ID: ${id}`);
    }

    return reflection;
  }

  public async findOneWithMessages(
    id: string,
  ): Promise<ReflectionWithMessagesDto> {
    this.logger.log(`Finding reflection with all messages by ID: ${id}`);
    const reflection = await this.reflectionRepository.findOne({
      relations: ["messages"],
      where: { id },
    });

    if (!reflection) {
      this.logger.warn(`Reflection not found with ID: ${id}`);
    }

    if (!reflection) {
      throw new NotFoundException("Reflection not found.");
    }

    return reflection;
  }

  async handleReflectionMessage(
    reflection: ReflectionWithMessagesDto,
    content: string,
  ): Promise<ChatMessage> {
    const userMessage = this.chatMessageRepository.create({
      content,
      role: ChatMessageRole.USER,
      sessionId: reflection.id,
    });
    this.chatMessageRepository.save(userMessage);
    reflection.messages.push(userMessage);
    await this.reflectionRepository.save(reflection);

    const assistantResponse =
      await this.aiAssistantService.getAssistantResponse(reflection.messages);

    const assistantMessage = this.chatMessageRepository.create({
      content: assistantResponse,
      role: ChatMessageRole.ASSISTANT,
      sessionId: reflection.id,
    });
    this.chatMessageRepository.save(assistantMessage);
    reflection.messages.push(assistantMessage);

    return assistantMessage;
  }
}
