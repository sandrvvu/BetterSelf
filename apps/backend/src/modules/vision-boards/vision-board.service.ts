import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BoardToImage } from "./board-to-image.entity";
import { Image } from "./image.entity";
import { CreateVisionBoardDto } from "./libs/dto/create-vision-board.dto";
import { UpdateVisionBoardDto } from "./libs/dto/update-vision-board.dto";
import { VisionBoard } from "./vision-board.entity";

@Injectable()
export class VisionBoardService {
  private readonly logger = new Logger("VisionBoardService");
  constructor(
    @InjectRepository(VisionBoard)
    private readonly visionBoardRepository: Repository<VisionBoard>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(BoardToImage)
    private readonly boardToImageRepository: Repository<BoardToImage>,
  ) {}

  public async attachImageToBoard(
    id: string,
    imageUrl: string,
  ): Promise<Image> {
    const image = this.imageRepository.create({ source: imageUrl });
    await this.imageRepository.save(image);

    const boardToImage = this.boardToImageRepository.create({
      imageId: image.id,
      visionBoardId: id,
    });
    await this.boardToImageRepository.save(boardToImage);

    return image;
  }

  public async create(
    userId: string,
    createVisionBoardDto: CreateVisionBoardDto,
  ): Promise<VisionBoard> {
    this.logger.log(
      `Creating vision board "${createVisionBoardDto.title}" for user with ID: ${userId}`,
    );

    await this.ensureVisionBoardIsUnique(userId, createVisionBoardDto.title);

    const visionBoard = this.visionBoardRepository.create({
      ...createVisionBoardDto,
      userId,
    });

    const savedVisionBoard = await this.visionBoardRepository.save(visionBoard);
    this.logger.log(
      `Vision board created successfully: ${savedVisionBoard.id}`,
    );
    return savedVisionBoard;
  }

  public async delete(visionBoard: VisionBoard): Promise<boolean> {
    const deletedVisionBoard =
      await this.visionBoardRepository.remove(visionBoard);

    this.logger.log(
      `Vision board deleted successfully: ${deletedVisionBoard.id}`,
    );

    return Boolean(deletedVisionBoard);
  }

  public async findAllByUserId(
    userId: string,
    goalId?: string,
    title?: string,
  ): Promise<VisionBoard[]> {
    const queryBuilder = this.visionBoardRepository
      .createQueryBuilder("visionBoard")
      .where("visionBoard.userId = :userId", { userId });

    if (goalId) {
      queryBuilder.andWhere("visionBoard.goalId = :goalId", { goalId });
    }

    if (title) {
      queryBuilder.andWhere("visionBoard.title ILIKE :title", {
        title: `%${title}%`,
      });
    }

    const visionBoards = await queryBuilder.getMany();

    if (!visionBoards.length) {
      this.logger.warn(`No vision boards found for userId: ${userId}`);
    }

    return visionBoards;
  }

  public async findImageByIdInBoard(
    visionBoardId: string,
    imageId: string,
  ): Promise<Image> {
    const boardToImage = await this.boardToImageRepository.findOne({
      relations: ["image"],
      where: { imageId, visionBoardId },
    });

    if (!boardToImage) {
      this.logger.warn(
        `Image with ID: ${imageId} is not found in vision board with ID: ${visionBoardId}`,
      );
      throw new NotFoundException("Image not found in vision board");
    }

    return boardToImage.image;
  }

  public async findOne(id: string): Promise<VisionBoard> {
    this.logger.log(`Finding vision board by ID: ${id}`);
    const visionBoard = await this.visionBoardRepository.findOne({
      relations: ["boardToImages", "boardToImages.image"],
      where: { id },
    });

    if (!visionBoard) {
      this.logger.warn(`Vision board not found with ID: ${id}`);
    }

    return visionBoard;
  }

  async removeImage(visionBoardId: string, imageId: string): Promise<Boolean> {
    this.logger.log(
      `Removing image ${imageId} from vision board with ID: ${visionBoardId}`,
    );

    const boardToImage = await this.boardToImageRepository.findOne({
      where: { imageId, visionBoardId },
    });

    if (!boardToImage) {
      this.logger.warn(
        `Image with ID: ${imageId} is not found in vision board with ID: ${visionBoardId}`,
      );
      throw new NotFoundException("Image not found in vision board");
    }

    await this.boardToImageRepository.remove(boardToImage);

    const deletedImage = await this.imageRepository.delete(imageId);

    this.logger.log(`Successfully deleted image ${imageId}`);
    return Boolean(deletedImage);
  }

  public async update(
    visionBoard: VisionBoard,
    updateVisionBoardDto: UpdateVisionBoardDto,
  ): Promise<VisionBoard> {
    if (
      updateVisionBoardDto.title &&
      updateVisionBoardDto.title !== visionBoard.title
    ) {
      await this.ensureVisionBoardIsUnique(
        visionBoard.userId,
        updateVisionBoardDto.title,
      );
    }
    Object.assign(visionBoard, updateVisionBoardDto);

    this.logger.log(`Vision board updated successfully: ${visionBoard.id}`);
    return await this.visionBoardRepository.save(visionBoard);
  }

  private async ensureVisionBoardIsUnique(
    userId: string,
    title: string,
  ): Promise<void> {
    const existingVisionBoard = await this.visionBoardRepository.findOne({
      where: { title, userId },
    });

    if (existingVisionBoard) {
      this.logger.warn(
        `Vision board with title "${title}" already exists for user ID: ${userId}`,
      );
      throw new ConflictException(
        "Vision board with this title already exists.",
      );
    }
  }
}
