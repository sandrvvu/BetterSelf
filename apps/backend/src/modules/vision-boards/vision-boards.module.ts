import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StorageService } from "src/common/services/storage/storage.service";

import { BoardToImage } from "./board-to-image.entity";
import { Image } from "./image.entity";
import { VisionBoardController } from "./vision-board.controller";
import { VisionBoard } from "./vision-board.entity";
import { VisionBoardService } from "./vision-board.service";

@Module({
  controllers: [VisionBoardController],
  imports: [TypeOrmModule.forFeature([BoardToImage, Image, VisionBoard])],
  providers: [VisionBoardService, StorageService],
})
export class VisionBoardsModule {}
