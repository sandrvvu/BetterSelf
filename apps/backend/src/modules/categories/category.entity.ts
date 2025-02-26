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
export class Category {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    example: "ae2e63c8-4c4a-45be-be16-60285580b8ae",
  })
  id: string;

  @Column()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    example: "Well-being",
  })
  name: string;

  @Column()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    example: "Invest in yourself.",
  })
  description: string;

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

  @ManyToOne(() => User, (user) => user.categories, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @Expose()
  user: User;
}
