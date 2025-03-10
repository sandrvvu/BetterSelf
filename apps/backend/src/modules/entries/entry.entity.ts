import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { User } from "../users/user.entity";

@Entity()
export class Entry {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    example: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  })
  id: string;

  @Column()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    example: "Reflections on today",
  })
  title: string;

  @Column()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    example:
      "Today, I focused on completing my project and felt a sense of accomplishment. I also took a walk in the park and enjoyed the scenery.",
  })
  content: string;

  @Column()
  @Expose()
  @ApiProperty({
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  userId: string;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.entries, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @Expose()
  user: User;
}
