import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddResult } from './interfaces/add-result.interface';
import { FavoritesDto } from './dto/favorites-dto';
import { Favorites } from './entities/favorites.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async getFavorites(): Promise<Favorites> {
    const favorites: Favorites[] = await this.favoritesRepository.find();

    // There is no user id for Favorites.
    // So, just use the first item from the array.
    return favorites[0];

    // const favorites: Favorites = this.favoritesRepository.getFavorites();
    // const favoritesDto = new FavoritesDto();
    // favoritesDto.artists = this.artistsRepository.findByIds(favorites.artists);
    // favoritesDto.albums = this.albumsRepository.findByIds(favorites.albums);
    // favoritesDto.tracks = this.tracksRepository.findByIds(favorites.tracks);

    // return favoritesDto;
  }

  // addTrack(trackId: string): AddResult {
  //   // if (!this.tracksRepository.isExist(trackId)) {
  //   //   throw new UnprocessableEntityException(`Track ${trackId} not found.`);
  //   // }

  //   if (!this.favoritesRepository.isFavoriteTrack(trackId)) {
  //     this.favoritesRepository.addTrack(trackId);
  //   }

  //   return { result: `Track ${trackId} was added to favorites.` };
  // }

  // deleteTrack(trackId: string): void {
  //   const deleted = this.favoritesRepository.deleteTrack(trackId);

  //   if (!deleted) {
  //     throw new NotFoundException(`Track ${trackId} not found.`);
  //   }
  // }

  // addAlbum(albumId: string): AddResult {
  //   // if (!this.albumsRepository.isExist(albumId)) {
  //   //   throw new UnprocessableEntityException(`Album ${albumId} not found.`);
  //   // }

  //   if (!this.favoritesRepository.isFavoriteAlbum(albumId)) {
  //     this.favoritesRepository.addAlbum(albumId);
  //   }

  //   return { result: `Album ${albumId} was added to favorites.` };
  // }

  // deleteAlbum(albumId: string): void {
  //   const deleted = this.favoritesRepository.deleteAlbum(albumId);

  //   if (!deleted) {
  //     throw new NotFoundException(`Album ${albumId} not found.`);
  //   }
  // }

  async addArtist(artistId: string): Promise<AddResult> {
    const favorites: Favorites = await this.getFavorites();
    const artist: Artist | null = await this.artistsRepository.findOneBy({
      id: artistId,
    });

    if (!artist) {
      throw new UnprocessableEntityException(`Artist ${artistId} not found.`);
    }

    if (!this.isItemExist(favorites.artists, artistId)) {
      favorites.artists.push(artist);
    }

    await this.favoritesRepository.save(favorites);

    return { result: `Artist ${artistId} was added to favorites.` };
  }

  async deleteArtist(artistId: string): Promise<void> {
    const favorites: Favorites = await this.getFavorites();

    if (!this.isItemExist(favorites.artists, artistId)) {
      throw new NotFoundException(`Artist ${artistId} was not in favorites.`);
    }

    favorites.artists = favorites.artists.filter((artist: Artist) => {
      return artist.id !== artistId;
    });

    await this.favoritesRepository.save(favorites);
  }

  private isItemExist(items: any[], itemId: string): boolean {
    const index: number = items.findIndex((item) => item.id === itemId);

    return index >= 0;
  }
}
