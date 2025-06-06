import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTopsisSettings1747646652243 implements MigrationInterface {
  name = "AddTopsisSettings1747646652243";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "topsis_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "criteria" text NOT NULL, "isBenefit" text NOT NULL, "weights" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_745ac2b697942664bf2d6929dd" UNIQUE ("userId"), CONSTRAINT "PK_e6b5586482b77df6167ac09d7a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ALTER COLUMN "content" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "topsis_settings" ADD CONSTRAINT "FK_745ac2b697942664bf2d6929ddc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "topsis_settings" DROP CONSTRAINT "FK_745ac2b697942664bf2d6929ddc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entry" ALTER COLUMN "content" SET DEFAULT 'Empty content.'`,
    );
    await queryRunner.query(`DROP TABLE "topsis_settings"`);
  }
}
