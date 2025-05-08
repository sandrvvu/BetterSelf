import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  ForbiddenException,
  NotFoundException,
  Query,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CurrentUserId } from "src/common/decorators";
import { StorageService } from "src/common/modules/storage/storage.service";

import { Image } from "./image.entity";
import { CreateVisionBoardDto } from "./libs/dto/create-vision-board.dto";
import { UpdateVisionBoardDto } from "./libs/dto/update-vision-board.dto";
import { VisionBoardWithImages } from "./libs/dto/vision-board-with-images";
import { VisionBoardWithPreviewImage } from "./libs/dto/vision-board-with-preview-image";
import { VisionBoard } from "./vision-board.entity";
import { VisionBoardService } from "./vision-board.service";

@ApiTags("Vision Boards")
@Controller("vision-boards")
export class VisionBoardController {
  constructor(
    private readonly visionBoardService: VisionBoardService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth("access-token")
  @ApiCreatedResponse({ type: VisionBoard })
  @ApiResponse({
    description: "The vision board has been successfully created.",
    status: 201,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  @ApiResponse({
    description: "Vision board with this name already exists.",
    status: 409,
  })
  async create(
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) createVisionBoardDto: CreateVisionBoardDto,
  ): Promise<VisionBoard> {
    return await this.visionBoardService.create(userId, createVisionBoardDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ schema: { type: "boolean" } })
  @ApiResponse({
    description: "The vision board has been successfully deleted.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Vision board is not found.", status: 404 })
  async delete(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Boolean> {
    const visionBoard = await this.findOneOrFail(id);
    this.checkVisionBoardOwnership(visionBoard, userId);
    return await this.visionBoardService.delete(visionBoard);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [VisionBoardWithPreviewImage] })
  @ApiResponse({
    description: "Successfully retrieved the user's vision boards.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  async findAllByUserId(
    @CurrentUserId() userId: string,
    @Query("goalId") goalId?: string,
    @Query("title") title?: string,
  ): Promise<VisionBoardWithPreviewImage[]> {
    return await this.visionBoardService.findAllByUserId(userId, goalId, title);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: VisionBoardWithImages })
  @ApiResponse({
    description: "Successfully retrieved the vision board.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Vision board is not found.", status: 404 })
  async findOne(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<VisionBoardWithImages> {
    const visionBoard = await this.findOneOrFail(id);
    this.checkVisionBoardOwnership(visionBoard, userId);
    return await this.visionBoardService.findOneWithImages(id);
  }

  @Delete(":id/image/:imageId")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ schema: { type: "boolean" } })
  @ApiResponse({
    description: "Image has been successfully removed.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Vision board or Image not found", status: 404 })
  @ApiResponse({
    description: "Error with storage during deleting files",
    status: 500,
  })
  async removeImageFromBoard(
    @Param("id") id: string,
    @Param("imageId") imageId: string,
    @CurrentUserId() userId: string,
  ): Promise<Boolean> {
    const visionBoard = await this.findOneOrFail(id);
    this.checkVisionBoardOwnership(visionBoard, userId);
    const image = await this.visionBoardService.findImageByIdInBoard(
      id,
      imageId,
    );
    await this.storageService.deleteFile(image.source);
    return await this.visionBoardService.removeImage(id, imageId);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: VisionBoard })
  @ApiResponse({
    description: "The vision board has been successfully updated.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Vision board not found.", status: 404 })
  @ApiResponse({
    description: "Vision board with this name already exists.",
    status: 409,
  })
  async update(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) updateVisionBoardDto: UpdateVisionBoardDto,
  ): Promise<VisionBoard> {
    const visionBoard = await this.findOneOrFail(id);
    this.checkVisionBoardOwnership(visionBoard, userId);
    return await this.visionBoardService.update(
      visionBoard,
      updateVisionBoardDto,
    );
  }

  @Post(":id/upload")
  @UseInterceptors(FileInterceptor("file"))
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth("access-token")
  @ApiCreatedResponse({ type: Image })
  @ApiConsumes("multipart/form-data")
  @ApiResponse({ description: "Image uploaded successfully", status: 201 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({
    description: "Error with storage during uploading files",
    status: 500,
  })
  async uploadImage(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Image> {
    const visionBoard = await this.findOneOrFail(id);
    this.checkVisionBoardOwnership(visionBoard, userId);
    const imageUrl = await this.storageService.uploadFile(file);
    return await this.visionBoardService.attachImageToBoard(id, imageUrl);
  }

  private checkVisionBoardOwnership(
    visionBoard: VisionBoard,
    userId: string,
  ): void {
    if (visionBoard.userId !== userId) {
      throw new ForbiddenException(
        "You can only access your own vision boards.",
      );
    }
  }

  private async findOneOrFail(id: string): Promise<VisionBoard> {
    const visionBoard = await this.visionBoardService.findOne(id);

    if (!visionBoard) {
      throw new NotFoundException("Vision board not found.");
    }

    return visionBoard;
  }
}
