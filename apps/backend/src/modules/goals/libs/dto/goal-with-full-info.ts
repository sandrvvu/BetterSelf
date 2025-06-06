import { ApiProperty } from "@nestjs/swagger";

import { Task } from "src/modules/tasks/task.entity";

import { GoalPriority, GoalStatus } from "../../goal.entity";

import { Progress } from "./progress";

interface DependencyInfo {
  id: string;
  title: string;
}

export interface TaskWithDependencies extends Omit<Task, "dependencies"> {
  dependencies: DependencyInfo[];
}

export class GoalWithFullInfo {
  @ApiProperty({
    description: "ID of the category the goal belongs to.",
    example: "f9e8d7c6-b5a4-3210-fedc-ba9876543210",
  })
  categoryId: string;

  @ApiProperty({
    description: "The name of the category.",
    example: "Personal Development",
  })
  categoryName: string;

  @ApiProperty({
    description: "Date and time the goal was created.",
    example: "2025-05-11T16:45:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Description of the goal.",
    example: "Achieve conversational fluency in Spanish.",
  })
  description?: string;

  @ApiProperty({
    description: "Unique identifier of the goal.",
    example: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  })
  id: string;

  @ApiProperty({
    description: "Priority of the goal.",
    enum: GoalPriority,
    example: GoalPriority.HIGH,
  })
  priority: GoalPriority;

  @ApiProperty({
    description: "Progress information for the goal.",
    type: () => Progress,
  })
  progress: Progress;

  @ApiProperty({
    description: "Current status of the goal.",
    enum: GoalStatus,
    example: GoalStatus.IN_PROGRESS,
  })
  status: GoalStatus;

  @ApiProperty({
    description: "Target completion date for the goal.",
    example: "2026-01-01",
  })
  targetDate?: Date;

  @ApiProperty({
    description: "List of tasks associated with the goal.",
  })
  tasks: TaskWithDependencies[];

  @ApiProperty({
    description: "Title of the goal.",
    example: "Learn a new language",
  })
  title: string;

  @ApiProperty({
    description: "Date and time the goal was last updated.",
    example: "2025-05-11T16:45:00.000Z",
  })
  updatedAt: Date;
}
