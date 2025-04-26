import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Goal } from "../goals/goal.entity";
import { User } from "../users/user.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    description: "Unique identifier of the category.",
    example: "ae2e63c8-4c4a-45be-be16-60285580b8ae",
  })
  id: string;

  @Column("varchar")
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Name of the category.",
    example: "Well-being",
  })
  name: string;

  @Column("text", { nullable: true })
  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty({
    description: "Description of the category.",
    example: "Invest in yourself.",
  })
  description?: string;

  @Column("uuid")
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "ID of the user who created the category.",
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  userId: string;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the category was created.",
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the category was last updated.",
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.categories, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => Goal, (goal) => goal.category)
  goals: Goal[];
}
