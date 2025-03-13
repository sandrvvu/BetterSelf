import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoalIdToEntries1741859792302 implements MigrationInterface {
  name = "AddGoalIdToEntries1741859792302";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "entry" ADD "goalId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "entry" ADD CONSTRAINT "FK_0a6488bccf65ac6c3fd41f34931" FOREIGN KEY ("goalId") REFERENCES "goal"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "entry" DROP CONSTRAINT "FK_0a6488bccf65ac6c3fd41f34931"`,
    );
    await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "goalId"`);
  }
}
