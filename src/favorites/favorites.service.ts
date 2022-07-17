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
import { AddResult } from './interfaces/add-result.interface';
import { FavoritesDto } from './dto/favorites-dto';
import { Favorites } from './entities/favorites.entity';
import { FavoritesRepository } from './repository/favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    @Inject(forwardRef(() => TracksRepository))
    private readonly tracksRepository: TracksRepository,
    @Inject(forwardRef(() => ArtistsRepository))
    private readonly artistsRepository: ArtistsRepository,
    @Inject(forwardRef(() => AlbumsRepository))
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

  addTrack(trackId: string): AddResult {
    if (!this.tracksRepository.isExist(trackId)) {
      throw new UnprocessableEntityException(`Track ${trackId} not found.`);
    }

    this.favoritesRepository.addTrack(trackId);

    return { result: `Track ${trackId} was added to favorites.` };
  }

  deleteTrack(trackId: string): void {
    const deleted = this.favoritesRepository.deleteTrack(trackId);

    if (!deleted) {
      throw new NotFoundException(`Track ${trackId} not found.`);
    }
  }

  addAlbum(albumId: string): AddResult {
    if (!this.albumsRepository.isExist(albumId)) {
      throw new UnprocessableEntityException(`Album ${albumId} not found.`);
    }

    this.favoritesRepository.addAlbum(albumId);

    return { result: `Album ${albumId} was added to favorites.` };
  }

  deleteAlbum(albumId: string): void {
    const deleted = this.favoritesRepository.deleteAlbum(albumId);

    if (!deleted) {
      throw new NotFoundException(`Album ${albumId} not found.`);
    }
  }

  addArtist(artistId: string): AddResult {
    if (!this.artistsRepository.isExist(artistId)) {
      throw new UnprocessableEntityException(`Artist ${artistId} not found.`);
    }

    this.favoritesRepository.addArtist(artistId);

    return { result: `Artist ${artistId} was added to favorites.` };
  }

  deleteArtist(artistId: string): void {
    const deleted = this.favoritesRepository.deleteArtist(artistId);

    if (!deleted) {
      throw new NotFoundException(`Artist ${artistId} not found.`);
    }
  }
}
