import { ApiProperty } from "@nestjs/swagger";

import { ChatMessage } from "../../chat-message.entity";
import { Reflection } from "../../reflection.entity";

export class ReflectionWithMessagesDto extends Reflection {
  @ApiProperty({ type: [ChatMessage] })
  messages: ChatMessage[];
}
