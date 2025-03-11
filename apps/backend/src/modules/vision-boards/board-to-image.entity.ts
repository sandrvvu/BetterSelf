import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from "typeorm";

import { Image } from "./image.entity";
import { VisionBoard } from "./vision-board.entity";

@Entity("board_to_images")
export class BoardToImage {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @Column()
  @Expose()
  @ApiProperty({
    example: "abcdef98-7654-3210-fedc-ba0987654321",
  })
  imageId: string;

  @Column()
  @Expose()
  @ApiProperty({
    example: "987f6543-d21c-4b3a-9876-543210fedcba",
  })
  visionBoardId: string;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @ManyToOne(() => VisionBoard, (visionBoard) => visionBoard.boardToImages, {
    onDelete: "CASCADE",
  })
  visionBoard: VisionBoard;

  @ManyToOne(() => Image, (image) => image.boardToImages, {
    onDelete: "CASCADE",
  })
  image: Image;
}
