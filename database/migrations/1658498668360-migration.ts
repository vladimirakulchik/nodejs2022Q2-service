import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658498668360 implements MigrationInterface {
  name = 'migration1658498668360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "login" character varying NOT NULL,
        "password" character varying NOT NULL,
        "version" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
        CREATE UNIQUE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "public"."IDX_a62473490b3e4578fd683235c5"
    `);
    await queryRunner.query(`
      DROP TABLE "user"
    `);
  }
}
