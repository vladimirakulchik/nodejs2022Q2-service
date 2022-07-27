import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658576292596 implements MigrationInterface {
  name = 'migration1658576292596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "track" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "duration" integer NOT NULL,
        "artistId" uuid,
        "albumId" uuid,
        CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "track"
      ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") 
        REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "track"
      ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") 
        REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"
    `);
    await queryRunner.query(`
      ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"
    `);
    await queryRunner.query(`
      DROP TABLE "track"
    `);
  }
}
