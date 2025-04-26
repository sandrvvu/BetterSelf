import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { Reflection } from "./reflection.entity";

export enum ChatMessageRole {
  ASSISTANT = "assistant",
  USER = "user",
}

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    description: "Unique identifier of the message.",
    example: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  })
  id: string;

  @Column("enum", {
    enum: ChatMessageRole,
  })
  @IsEnum(ChatMessageRole)
  @Expose()
  @ApiProperty({
    description: "Role of the message sender (assistant or user).",
    example: ChatMessageRole.USER,
  })
  role: ChatMessageRole;

  @Column("text")
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Content of the message.",
    example:
      "I feel tired after a hard day. What can I do to improve my energy tomorrow?",
  })
  content: string;

  @Column("uuid")
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description:
      "ID of the reflection session this message is associated with.",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  sessionId: string;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the reflection was created.",
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @ManyToOne(() => Reflection, (reflection) => reflection.messages, {
    nullable: false,
    onDelete: "CASCADE",
  })
  session: Reflection;
}
