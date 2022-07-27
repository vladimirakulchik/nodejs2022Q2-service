import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658615468654 implements MigrationInterface {
  name = 'migration1658615468654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "favorites_albums_album" (
        "favoritesId" uuid NOT NULL,
        "albumId" uuid NOT NULL,
        CONSTRAINT "PK_4caba2d65763821c7dd2db51558" PRIMARY KEY ("favoritesId", "albumId")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_31b327b5a4f89d2eb722968982" ON "favorites_albums_album" ("favoritesId")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_4ff0c3cde93d2bc8c23c2b72c3" ON "favorites_albums_album" ("albumId")
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_albums_album"
      ADD CONSTRAINT "FK_31b327b5a4f89d2eb7229689829" FOREIGN KEY ("favoritesId") 
        REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_albums_album"
      ADD CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f" FOREIGN KEY ("albumId") 
        REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f"
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_31b327b5a4f89d2eb7229689829"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_4ff0c3cde93d2bc8c23c2b72c3"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_31b327b5a4f89d2eb722968982"
    `);
    await queryRunner.query(`
      DROP TABLE "favorites_albums_album"
    `);
  }
}
