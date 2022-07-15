import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsRepository } from './repository/artists.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, ArtistsRepository],
})
export class ArtistsModule {}
