import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGoalsTable1742326308827 implements MigrationInterface {
  name = "CreateGoalsTable1742326308827";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."goal_priority_enum" AS ENUM('low', 'medium', 'high')`,
    );
    await queryRunner.query(
      `CREATE TABLE "goal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "categoryId" uuid NOT NULL, "title" character varying NOT NULL, "description" text, "priority" "public"."goal_priority_enum" NOT NULL, "targetDate" date, "status" "public"."goal_status_enum" NOT NULL DEFAULT 'pending', "progress" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_88c8e2b461b711336c836b1e130" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "goal" ADD CONSTRAINT "FK_57f5da4b448e29b5d33743ec784" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "goal" DROP CONSTRAINT "FK_57f5da4b448e29b5d33743ec784"`,
    );
    await queryRunner.query(`DROP TABLE "goal"`);
    await queryRunner.query(`DROP TYPE "public"."goal_priority_enum"`);
  }
}
