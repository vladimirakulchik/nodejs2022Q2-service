import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658509591127 implements MigrationInterface {
  name = 'migration1658509591127';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "artist" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "grammy" boolean NOT NULL,
        CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "artist"
    `);
  }
}
