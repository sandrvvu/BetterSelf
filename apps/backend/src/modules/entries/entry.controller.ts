import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  ForbiddenException,
  NotFoundException,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CurrentUserId } from "src/common/decorators";

import { Entry } from "./entry.entity";
import { EntryService } from "./entry.service";
import { CreateEntryDto } from "./libs/dto/create-entry.dto";
import { UpdateEntryDto } from "./libs/dto/update-entry.dto";

@ApiTags("Entries")
@Controller("entries")
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth("access-token")
  @ApiCreatedResponse({ type: Entry })
  @ApiResponse({
    description: "The entry has been successfully created.",
    status: 201,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Invalid data type provided.", status: 400 })
  async create(
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) createEntryDto: CreateEntryDto,
  ): Promise<Entry> {
    return await this.entryService.create(userId, createEntryDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ schema: { type: "boolean" } })
  @ApiResponse({
    description: "The entry has been successfully deleted.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Entry is not found.", status: 404 })
  async delete(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Boolean> {
    const entry = await this.findOneOrFail(id);
    this.checkEntryOwnership(entry, userId);
    return await this.entryService.delete(entry);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: [Entry] })
  @ApiResponse({
    description: "Successfully retrieved the user's entries.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  async findAllByUserId(@CurrentUserId() userId: string) {
    return await this.entryService.findAllByUserId(userId);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: Entry })
  @ApiResponse({
    description: "Successfully retrieved the entry.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Entry is not found.", status: 404 })
  async findOne(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
  ): Promise<Entry> {
    const entry = await this.findOneOrFail(id);
    this.checkEntryOwnership(entry, userId);
    return entry;
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("access-token")
  @ApiOkResponse({ type: Entry })
  @ApiResponse({
    description: "The entry has been successfully updated.",
    status: 200,
  })
  @ApiResponse({ description: "Unauthorized.", status: 401 })
  @ApiResponse({ description: "Access denied.", status: 403 })
  @ApiResponse({ description: "Entry not found.", status: 404 })
  async update(
    @Param("id") id: string,
    @CurrentUserId() userId: string,
    @Body(ValidationPipe) updateEntryDto: UpdateEntryDto,
  ) {
    const entry = await this.findOneOrFail(id);
    this.checkEntryOwnership(entry, userId);
    return await this.entryService.update(entry, updateEntryDto);
  }

  private checkEntryOwnership(entry: Entry, userId: string): void {
    if (entry.userId !== userId) {
      throw new ForbiddenException("You can only access your own entries");
    }
  }

  private async findOneOrFail(id: string): Promise<Entry> {
    const entry = await this.entryService.findOne(id);

    if (!entry) {
      throw new NotFoundException("Entry not found.");
    }

    return entry;
  }
}
