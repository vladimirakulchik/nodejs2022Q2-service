import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658595352462 implements MigrationInterface {
  name = 'migration1658595352462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "favorites" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "favorites_artists_artist" (
        "favoritesId" uuid NOT NULL,
        "artistId" uuid NOT NULL,
        CONSTRAINT "PK_a6aeacbfda85e00ccc625a84474" PRIMARY KEY ("favoritesId", "artistId")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_663b6278dbd0f67925d1238ade" ON "favorites_artists_artist" ("favoritesId")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_2a44f2a39bd14c72dfd8ad7933" ON "favorites_artists_artist" ("artistId")
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_artists_artist"
      ADD CONSTRAINT "FK_663b6278dbd0f67925d1238ade2" FOREIGN KEY ("favoritesId")
        REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_artists_artist"
      ADD CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b" FOREIGN KEY ("artistId")
        REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
      INSERT INTO "favorites" VALUES (DEFAULT)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b"
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_663b6278dbd0f67925d1238ade2"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_2a44f2a39bd14c72dfd8ad7933"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_663b6278dbd0f67925d1238ade"
    `);
    await queryRunner.query(`
      DROP TABLE "favorites_artists_artist"
    `);
    await queryRunner.query(`
      DROP TABLE "favorites"
    `);
  }
}
