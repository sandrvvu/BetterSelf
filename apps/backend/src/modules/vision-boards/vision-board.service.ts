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
import { VisionBoardWithImages } from "./libs/dto/vision-board-with-images";
import { VisionBoardWithPreviewImage } from "./libs/dto/vision-board-with-preview-image";
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
  ): Promise<VisionBoardWithPreviewImage[]> {
    const queryBuilder = this.visionBoardRepository
      .createQueryBuilder("visionBoard")
      .leftJoinAndSelect("visionBoard.boardToImages", "boardToImages")
      .leftJoinAndSelect("boardToImages.image", "image")
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

    return visionBoards.map((vb) => {
      const images = vb.boardToImages
        .map((bti) => bti.image)
        .filter(Boolean)
        .map((img) => ({
          id: img.id,
          source: img.source,
        }));

      const previewImage = images.length ? images[images.length - 1] : null;

      return {
        createdAt: vb.createdAt,
        description: vb.description,
        goalId: vb.goalId,
        id: vb.id,
        previewImage,
        title: vb.title,
        updatedAt: vb.updatedAt,
        userId: vb.userId,
      };
    });
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
      where: { id },
    });

    if (!visionBoard) {
      this.logger.warn(`Vision board not found with ID: ${id}`);
    }

    return visionBoard;
  }

  public async findOneWithImages(id: string): Promise<VisionBoardWithImages> {
    this.logger.log(`Finding vision board by ID: ${id}`);
    const visionBoard = await this.visionBoardRepository.findOne({
      relations: ["boardToImages", "boardToImages.image"],
      where: { id },
    });

    if (!visionBoard) {
      this.logger.warn(`Vision board not found with ID: ${id}`);
    }

    const images =
      visionBoard.boardToImages?.map((bti) => ({
        id: bti.image.id,
        source: bti.image.source,
      })) ?? [];

    const { boardToImages, ...rest } = visionBoard;

    return {
      ...rest,
      images,
    };
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
