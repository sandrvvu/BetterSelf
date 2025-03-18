import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVisionBoardAndImageTable1742326876888
  implements MigrationInterface
{
  name = "CreateVisionBoardAndImageTable1742326876888";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "source" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "board_to_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageId" uuid NOT NULL, "visionBoardId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0033a4ec6410b36a394c34353fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vision_board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "userId" uuid NOT NULL, "goalId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_92173a6059c1f9a3b923eccca08" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_to_image" ADD CONSTRAINT "FK_81936532e54848bf8346d143802" FOREIGN KEY ("visionBoardId") REFERENCES "vision_board"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_to_image" ADD CONSTRAINT "FK_98cac80cada71030b77ea2bc1b0" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vision_board" ADD CONSTRAINT "FK_be52aa51926525f57079a019034" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vision_board" ADD CONSTRAINT "FK_b5b30d67aa25f1bcd1954bda62b" FOREIGN KEY ("goalId") REFERENCES "goal"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vision_board" DROP CONSTRAINT "FK_b5b30d67aa25f1bcd1954bda62b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vision_board" DROP CONSTRAINT "FK_be52aa51926525f57079a019034"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_to_image" DROP CONSTRAINT "FK_98cac80cada71030b77ea2bc1b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_to_image" DROP CONSTRAINT "FK_81936532e54848bf8346d143802"`,
    );
    await queryRunner.query(`DROP TABLE "vision_board"`);
    await queryRunner.query(`DROP TABLE "board_to_image"`);
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
