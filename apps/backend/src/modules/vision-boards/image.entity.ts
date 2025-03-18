import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { BoardToImage } from "./board-to-image.entity";

@Entity()
export class Image {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    description: "Unique identifier of the image.",
    example: "abcdef98-7654-3210-fedc-ba0987654321",
  })
  id: string;

  @Column("varchar")
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "URL or source of the image.",
    example: "https://example.com/image.jpg",
  })
  source: string;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the image was created.",
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    description: "Date and time the image was last updated.",
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @OneToMany(() => BoardToImage, (boardToImage) => boardToImage.image)
  boardToImages: BoardToImage[];
}
