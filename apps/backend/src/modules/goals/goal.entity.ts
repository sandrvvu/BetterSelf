import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  Min,
  Max,
} from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { Category } from "../categories/category.entity";
import { Entry } from "../entries/entry.entity";
import { VisionBoard } from "../vision-boards/vision-board.entity";

export enum GoalStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

@Entity()
export class Goal {
  @PrimaryGeneratedColumn("uuid")
  @Expose()
  @ApiProperty({
    example: "b5f68e29-2c7d-4a6f-8a1b-3c8f98a45678",
  })
  id: string;

  @ManyToOne(() => Category, (category) => category.goals, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @Expose()
  category: Category;

  @Column()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    example: "d3f8e19a-6a5f-4c8e-9a7b-2f6b41a8c123",
  })
  categoryId: string;

  @Column()
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    example: "Complete the programming course",
  })
  title: string;

  @Column("text", { nullable: true })
  @IsOptional()
  @Expose()
  @ApiProperty({
    example: "Finish all course modules and pass the final exam.",
  })
  description?: string;

  @Column({ default: 1 })
  @IsInt()
  @Min(1)
  @Max(5)
  @Expose()
  @ApiProperty({
    description: "Priority level (1 to 5).",
    example: 3,
  })
  priority: number;

  @Column({ type: "date" })
  @IsNotEmpty()
  @Expose()
  @ApiProperty({
    description: "Target date for goal completion.",
    example: "2025-12-31",
  })
  targetDate: Date;

  @Column({
    default: GoalStatus.PENDING,
    enum: GoalStatus,
    type: "enum",
  })
  @IsEnum(GoalStatus)
  @Expose()
  @ApiProperty({
    description: "Current status of the goal.",
    example: GoalStatus.IN_PROGRESS,
  })
  status: GoalStatus;

  @Column({ default: 0, type: "float" })
  @IsInt()
  @Min(0)
  @Max(100)
  @Expose()
  @ApiProperty({
    description: "Goal progress in percentage (0 to 100).",
    example: 50,
  })
  progress: number;

  @CreateDateColumn()
  @Expose()
  @ApiProperty({
    example: "2025-02-20T12:27:02.176Z",
  })
  createdAt: Date;

  @UpdateDateColumn()
  @Expose()
  @ApiProperty({
    example: "2025-02-20T12:27:02.176Z",
  })
  updatedAt: Date;

  @OneToMany(() => VisionBoard, (board) => board.goal)
  visionBoards: VisionBoard[];

  @OneToMany(() => Entry, (entry) => entry.goal)
  entries: Entry[];
}
