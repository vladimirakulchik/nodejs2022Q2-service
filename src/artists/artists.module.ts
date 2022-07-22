import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { Artist } from './entities/artist.entity';
import { AlbumsModule } from 'src/albums/albums.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Artist]),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumsModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
