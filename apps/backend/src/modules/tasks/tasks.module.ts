import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TaskController } from "./task.controller";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";

@Module({
  controllers: [TaskController],
  exports: [TaskService],
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
})
export class TasksModule {}
