import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AiAssistantService } from "../../common/modules/ai-assistant/ai-assistant.service";

import { ChatMessage } from "./chat-message.entity";
import { ReflectionController } from "./reflection.controller";
import { Reflection } from "./reflection.entity";
import { ReflectionService } from "./reflection.service";

@Module({
  controllers: [ReflectionController],
  imports: [TypeOrmModule.forFeature([Reflection, ChatMessage])],
  providers: [AiAssistantService, ReflectionService],
})
export class ReflectionsModule {}
