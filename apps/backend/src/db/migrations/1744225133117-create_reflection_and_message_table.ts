import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReflectionAndMessageTable1744225133117
  implements MigrationInterface
{
  name = "CreateReflectionAndMessageTable1744225133117";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."chat_message_role_enum" AS ENUM('assistant', 'user')`,
    );
    await queryRunner.query(
      `CREATE TABLE "chat_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."chat_message_role_enum" NOT NULL, "content" text NOT NULL, "sessionId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3cc0d85193aade457d3077dd06b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reflection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0436416fb00a0944412935c919d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_message" ADD CONSTRAINT "FK_9920f68af92e018eabdba396282" FOREIGN KEY ("sessionId") REFERENCES "reflection"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reflection" ADD CONSTRAINT "FK_2a41b9b70d50933840c03520218" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reflection" DROP CONSTRAINT "FK_2a41b9b70d50933840c03520218"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chat_message" DROP CONSTRAINT "FK_9920f68af92e018eabdba396282"`,
    );
    await queryRunner.query(`DROP TABLE "reflection"`);
    await queryRunner.query(`DROP TABLE "chat_message"`);
    await queryRunner.query(`DROP TYPE "public"."chat_message_role_enum"`);
  }
}
