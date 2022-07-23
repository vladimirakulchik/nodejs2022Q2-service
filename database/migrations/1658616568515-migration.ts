import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1658616568515 implements MigrationInterface {
  name = 'migration1658616568515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "favorites_tracks_track" (
        "favoritesId" uuid NOT NULL,
        "trackId" uuid NOT NULL,
        CONSTRAINT "PK_613647698cfa077425b1047e1a6" PRIMARY KEY ("favoritesId", "trackId")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_3ecf4f6fab33cc9611b9e40292" ON "favorites_tracks_track" ("favoritesId")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_fee451584feed445b14adb7fb8" ON "favorites_tracks_track" ("trackId")
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_tracks_track"
      ADD CONSTRAINT "FK_3ecf4f6fab33cc9611b9e402927" FOREIGN KEY ("favoritesId")
        REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_tracks_track"
      ADD CONSTRAINT "FK_fee451584feed445b14adb7fb80" FOREIGN KEY ("trackId")
        REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_fee451584feed445b14adb7fb80"
    `);
    await queryRunner.query(`
      ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_3ecf4f6fab33cc9611b9e402927"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_fee451584feed445b14adb7fb8"
    `);
    await queryRunner.query(`
      DROP INDEX "public"."IDX_3ecf4f6fab33cc9611b9e40292"
    `);
    await queryRunner.query(`
      DROP TABLE "favorites_tracks_track"
    `);
  }
}
