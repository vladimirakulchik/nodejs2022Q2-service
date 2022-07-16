import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TracksRepository } from './repository/tracks.repository';
import { DatabaseModule } from 'src/database/database.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [DatabaseModule, FavoritesModule],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
  exports: [TracksRepository],
})
export class TracksModule {}
