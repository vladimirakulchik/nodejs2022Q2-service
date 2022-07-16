import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsRepository } from 'src/albums/repository/albums.repository';
import { ArtistsRepository } from 'src/artists/repository/artists.repository';
import { TracksRepository } from 'src/tracks/repository/tracks.repository';
import { FavoritesDto } from './dto/favorites-dto';
import { Favorites } from './entities/favorites.entity';
import { FavoritesRepository } from './repository/favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    @Inject(forwardRef(() => TracksRepository))
    private readonly tracksRepository: TracksRepository,
    private readonly artistsRepository: ArtistsRepository,
    private readonly albumsRepository: AlbumsRepository,
  ) {}

  getFavorites(): FavoritesDto {
    const favorites: Favorites = this.favoritesRepository.getFavorites();
    const favoritesDto = new FavoritesDto();
    favoritesDto.artists = this.artistsRepository.findByIds(favorites.artists);
    favoritesDto.albums = this.albumsRepository.findByIds(favorites.albums);
    favoritesDto.tracks = this.tracksRepository.findByIds(favorites.tracks);

    return favoritesDto;
  }

  // return anything
  addTrack(trackId: string): void {
    if (!this.tracksRepository.isExist(trackId)) {
      throw new UnprocessableEntityException(`Track ${trackId} not found.`);
    }

    return this.favoritesRepository.addTrack(trackId);
  }

  deleteTrack(trackId: string): void {
    const deleted = this.favoritesRepository.deleteTrack(trackId);

    if (!deleted) {
      throw new NotFoundException(`Track ${trackId} not found.`);
    }
  }
}
