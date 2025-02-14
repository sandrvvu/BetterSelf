import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    example: "1",
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
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  updatedAt: Date;
}
