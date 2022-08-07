import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1659887164905 implements MigrationInterface {
  name = 'migration1659887164905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "public"."IDX_a62473490b3e4578fd683235c5"
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX "public"."IDX_a62473490b3e4578fd683235c5"
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login")
    `);
  }
}
