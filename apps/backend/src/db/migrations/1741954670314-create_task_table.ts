import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskTable1741954670314 implements MigrationInterface {
  name = "CreateTaskTable1741954670314";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum" AS ENUM('pending', 'completed')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_estimatedtimeunit_enum" AS ENUM('minutes', 'hours', 'days', 'months', 'years')`,
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "goalId" uuid NOT NULL, "title" character varying NOT NULL, "description" text, "priority" integer NOT NULL DEFAULT '1', "targetDate" date, "status" "public"."task_status_enum" NOT NULL DEFAULT 'pending', "estimatedTime" integer, "estimatedTimeUnit" "public"."task_estimatedtimeunit_enum" NOT NULL DEFAULT 'minutes', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_266bc4eb256aee41118272eccf3" FOREIGN KEY ("goalId") REFERENCES "goal"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_266bc4eb256aee41118272eccf3"`,
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TYPE "public"."task_estimatedtimeunit_enum"`);
    await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
  }
}
