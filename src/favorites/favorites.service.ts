import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddResult } from './interfaces/add-result.interface';
import { Favorites } from './entities/favorites.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  async getFavorites(): Promise<Favorites> {
    const favorites: Favorites[] = await this.favoritesRepository.find();

    // There is no user id for Favorites.
    // So, just use the first item from the array.
    return favorites[0];
  }

  async addTrack(trackId: string): Promise<AddResult> {
    const favorites: Favorites = await this.getFavorites();
    const track: Track | null = await this.tracksRepository.findOneBy({
      id: trackId,
    });

    if (!track) {
      throw new UnprocessableEntityException(`Track ${trackId} not found.`);
    }

    if (!this.isItemExist(favorites.tracks, trackId)) {
      favorites.tracks.push(track);
    }

    await this.favoritesRepository.save(favorites);

    return { result: `Track ${trackId} was added to favorites.` };
  }

  async deleteTrack(trackId: string): Promise<void> {
    const favorites: Favorites = await this.getFavorites();

    if (!this.isItemExist(favorites.tracks, trackId)) {
      throw new NotFoundException(`Track ${trackId} was not in favorites.`);
    }

    favorites.tracks = favorites.tracks.filter((track: Track) => {
      return track.id !== trackId;
    });

    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(albumId: string): Promise<AddResult> {
    const favorites: Favorites = await this.getFavorites();
    const album: Album | null = await this.albumsRepository.findOneBy({
      id: albumId,
    });

    if (!album) {
      throw new UnprocessableEntityException(`Album ${albumId} not found.`);
    }

    if (!this.isItemExist(favorites.albums, albumId)) {
      favorites.albums.push(album);
    }

    await this.favoritesRepository.save(favorites);

    return { result: `Album ${albumId} was added to favorites.` };
  }

  async deleteAlbum(albumId: string): Promise<void> {
    const favorites: Favorites = await this.getFavorites();

    if (!this.isItemExist(favorites.albums, albumId)) {
      throw new NotFoundException(`Album ${albumId} was not in favorites.`);
    }

    favorites.albums = favorites.albums.filter((album: Album) => {
      return album.id !== albumId;
    });

    await this.favoritesRepository.save(favorites);
  }

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
