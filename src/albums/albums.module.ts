import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { AlbumsRepository } from './repository/albums.repository';
import { DatabaseModule } from 'src/database/database.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService, AlbumsRepository],
  exports: [AlbumsRepository],
})
export class AlbumsModule {}
