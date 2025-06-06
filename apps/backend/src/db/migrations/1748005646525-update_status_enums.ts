import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateStatusEnums1748005646525 implements MigrationInterface {
  name = "UpdateStatusEnums1748005646525";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."task_status_enum" RENAME TO "task_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum" AS ENUM('pending', 'completed', 'overdue')`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" TYPE "public"."task_status_enum" USING "status"::"text"::"public"."task_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."task_status_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."goal_status_enum" RENAME TO "goal_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."goal_status_enum" AS ENUM('pending', 'in_progress', 'completed', 'needs_correction', 'archived')`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ALTER COLUMN "status" TYPE "public"."goal_status_enum" USING "status"::"text"::"public"."goal_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."goal_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."goal_status_enum_old" AS ENUM('pending', 'in_progress', 'completed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ALTER COLUMN "status" TYPE "public"."goal_status_enum_old" USING "status"::"text"::"public"."goal_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."goal_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."goal_status_enum_old" RENAME TO "goal_status_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum_old" AS ENUM('pending', 'completed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" TYPE "public"."task_status_enum_old" USING "status"::"text"::"public"."task_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."task_status_enum_old" RENAME TO "task_status_enum"`,
    );
  }
}
