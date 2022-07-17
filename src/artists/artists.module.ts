import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './repository/artists.repository';
import { DatabaseModule } from 'src/database/database.module';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => FavoritesModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
  exports: [ArtistsRepository],
})
export class ArtistsModule {}
