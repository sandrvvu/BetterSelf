import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVisionBoardAndImageTables1741690186249
  implements MigrationInterface
{
  name = "CreateVisionBoardAndImageTables1741690186249";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "source" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "board_to_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageId" uuid NOT NULL, "visionBoardId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5477bf1325f727058d0c61588d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vision_boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "userId" uuid NOT NULL, "goalId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fa29985422c766c4b0789656c4b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_to_images" ADD CONSTRAINT "FK_382c04ddbac72900f692fbb306e" FOREIGN KEY ("visionBoardId") REFERENCES "vision_boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_to_images" ADD CONSTRAINT "FK_367a1c1e8dfe8cd112bf344fb7b" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vision_boards" ADD CONSTRAINT "FK_f3108b1c5d54cce4062649eef63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vision_boards" ADD CONSTRAINT "FK_2260bbe5be49c3973109e23a5f0" FOREIGN KEY ("goalId") REFERENCES "goal"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vision_boards" DROP CONSTRAINT "FK_2260bbe5be49c3973109e23a5f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vision_boards" DROP CONSTRAINT "FK_f3108b1c5d54cce4062649eef63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_to_images" DROP CONSTRAINT "FK_367a1c1e8dfe8cd112bf344fb7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_to_images" DROP CONSTRAINT "FK_382c04ddbac72900f692fbb306e"`,
    );
    await queryRunner.query(`DROP TABLE "vision_boards"`);
    await queryRunner.query(`DROP TABLE "board_to_images"`);
    await queryRunner.query(`DROP TABLE "images"`);
  }
}
