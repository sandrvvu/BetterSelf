import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Category } from "../categories/category.entity";
import { Entry } from "../entries/entry.entity";
import { VisionBoard } from "../vision-boards/vision-board.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    description: "Unique identifier of the user.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  id: string;

  @Column("varchar", { unique: true })
  @IsEmail()
  @Expose()
  @ApiProperty({
    description: "Email address of the user (must be unique).",
    example: "marie@gmail.com",
  })
  email: string;

  @Column("varchar")
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Name of the user.",
    example: "Marie",
  })
  name: string;

  @Column("varchar")
  @IsNotEmpty()
  @ApiProperty({
    description: "Password of the user.",
    example: "Marie123!",
  })
  password: string;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the user account was created.",
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the user account was last updated.",
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Entry, (entry) => entry.user)
  entries: Entry[];

  @OneToMany(() => VisionBoard, (board) => board.user)
  visionBoards: VisionBoard[];
}
