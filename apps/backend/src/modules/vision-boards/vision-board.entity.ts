import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { Goal } from "../goals/goal.entity";
import { User } from "../users/user.entity";

import { BoardToImage } from "./board-to-image.entity";

@Entity()
export class VisionBoard {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    description: "Unique identifier of the vision board.",
    example: "987f6543-d21c-4b3a-9876-543210fedcba",
  })
  id: string;

  @Column("varchar")
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Title of the vision board.",
    example: "My Dream Board",
  })
  title: string;

  @Column("text")
  @IsString()
  @Expose()
  @ApiProperty({
    description: "Description of the vision board.",
    example: "Visualizing my goals for the next quarter.",
  })
  description: string;

  @Column("uuid")
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "ID of the user who created the vision board.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  userId: string;

  @Column("uuid", { default: null, nullable: true })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "ID of the goal associated with the vision board.",
    example: "b5f68e29-2c7d-4a6f-8a1b-3c8f98a45678",
    nullable: true,
  })
  goalId: string | null;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the vision board was created.",
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the vision board was last updated.",
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.visionBoards, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Goal, (goal) => goal.visionBoards, {
    nullable: true,
    onDelete: "SET NULL",
  })
  goal: Goal | null;

  @OneToMany(() => BoardToImage, (boardToImage) => boardToImage.visionBoard)
  boardToImages: BoardToImage[];
}
