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

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  id: string;

  @Column({ unique: true })
  @IsEmail()
  @Expose()
  @ApiProperty({
    example: "marie@gmail.com",
  })
  email: string;

  @Column()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    example: "Marie",
  })
  name: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty({
    example: "Marie123!",
  })
  password: string;

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

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
