import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './repository/favorites.repository';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { DatabaseModule } from 'src/database/database.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => TracksModule),
    ArtistsModule,
    AlbumsModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesRepository],
})
export class FavoritesModule {}
