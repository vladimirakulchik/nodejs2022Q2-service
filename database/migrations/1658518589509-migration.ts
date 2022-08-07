import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658518589509 implements MigrationInterface {
  name = 'migration1658518589509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "album" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "year" integer NOT NULL,
        "artistId" uuid,
        CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "album"
      ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") 
        REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"
    `);
    await queryRunner.query(`
      DROP TABLE "album"
    `);
  }
}
