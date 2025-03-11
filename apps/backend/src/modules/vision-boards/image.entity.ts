import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { BoardToImage } from "./board-to-image.entity";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    example: "abcdef98-7654-3210-fedc-ba0987654321",
  })
  id: string;

  @Column()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    example: "https://example.com/image.jpg",
  })
  source: string;

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

  @OneToMany(() => BoardToImage, (boardToImage) => boardToImage.image)
  boardToImages: BoardToImage[];
}
