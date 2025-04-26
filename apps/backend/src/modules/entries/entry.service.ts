import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Entry } from "./entry.entity";
import { CreateEntryDto } from "./libs/dto/create-entry.dto";
import { UpdateEntryDto } from "./libs/dto/update-entry.dto";

@Injectable()
export class EntryService {
  private readonly logger = new Logger("EntryService");
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  public async create(
    userId: string,
    createEntryDto: CreateEntryDto,
  ): Promise<Entry> {
    this.logger.log(
      `Creating entry "${createEntryDto.title}" for user with ID: ${userId}`,
    );

    const entry = this.entryRepository.create({
      ...createEntryDto,
      userId,
    });

    const savedEntry = await this.entryRepository.save(entry);
    this.logger.log(`Entry created successfully: ${savedEntry.id}`);
    return savedEntry;
  }

  public async delete(entry: Entry): Promise<boolean> {
    const deletedEntry = await this.entryRepository.remove(entry);

    this.logger.log(`Entry deleted successfully: ${deletedEntry.id}`);
    return Boolean(deletedEntry);
  }

  public async findAllByUserId(userId: string): Promise<Entry[]> {
    const entries = await this.entryRepository.findBy({ userId });

    if (!entries.length) {
      this.logger.warn(`No entries found for userId: ${userId}`);
    }

    return entries;
  }

  public async findOne(id: string): Promise<Entry> {
    this.logger.log(`Finding entry by ID: ${id}`);
    const entry = await this.entryRepository.findOneBy({ id });

    if (!entry) {
      this.logger.warn(`Entry not found with ID: ${id}`);
    }

    return entry;
  }

  public async update(
    entry: Entry,
    updateEntryDto: UpdateEntryDto,
  ): Promise<Entry> {
    Object.assign(entry, updateEntryDto);

    this.logger.log(`Entry updated successfully: ${entry.id}`);
    return await this.entryRepository.save(entry);
  }
}
