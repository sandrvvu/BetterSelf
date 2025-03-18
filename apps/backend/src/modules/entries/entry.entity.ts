import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { Goal } from "../goals/goal.entity";
import { User } from "../users/user.entity";

@Entity()
export class Entry {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    description: "Unique identifier of the entry.",
    example: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  })
  id: string;

  @Column("varchar")
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Title of the entry.",
    example: "Reflections on today",
  })
  title: string;

  @Column("text")
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Content of the entry.",
    example:
      "Today, I focused on completing my project and felt a sense of accomplishment. I also took a walk in the park and enjoyed the scenery.",
  })
  content: string;

  @Column("uuid")
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "ID of the user who created the entry.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  userId: string;

  @Column("uuid", { default: null, nullable: true })
  @Expose()
  @ApiProperty({
    description: "ID of the goal associated with the entry.",
    example: "b5f68e29-2c7d-4a6f-8a1b-3c8f98a45678",
    nullable: true,
  })
  goalId: string | null;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the entry was created.",
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the entry was last updated.",
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.entries, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Goal, (goal) => goal.entries, {
    nullable: true,
    onDelete: "SET NULL",
  })
  goal: Goal | null;
}
