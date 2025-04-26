import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { EntryController } from "./entry.controller";
import { Entry } from "./entry.entity";
import { EntryService } from "./entry.service";

@Module({
  controllers: [EntryController],
  imports: [TypeOrmModule.forFeature([Entry])],
  providers: [EntryService],
})
export class EntriesModule {}
