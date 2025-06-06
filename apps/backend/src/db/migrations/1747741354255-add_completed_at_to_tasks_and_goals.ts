import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompletedAtToTasksAndGoals1747741354255
  implements MigrationInterface
{
  name = "AddCompletedAtToTasksAndGoals1747741354255";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" ADD "completedAt" date`);
    await queryRunner.query(`ALTER TABLE "goal" ADD "completedAt" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "goal" DROP COLUMN "completedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "completedAt"`);
  }
}
