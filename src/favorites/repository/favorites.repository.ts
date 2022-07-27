import { Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { Favorites } from '../entities/favorites.entity';

@Injectable()
export class FavoritesRepository {
  constructor(private db: InMemoryDB) {}

  getFavorites(): Favorites {
    return this.db.favorites;
  }

  addTrack(trackId: string): void {
    this.db.favorites.tracks.push(trackId);
  }

  isFavoriteTrack(trackId: string): boolean {
    return this.findIndex(this.db.favorites.tracks, trackId) >= 0;
  }

  deleteTrack(trackId: string): boolean {
    const index = this.findIndex(this.db.favorites.tracks, trackId);

    if (index < 0) {
      return false;
    }

    this.db.favorites.tracks.splice(index, 1);
    return true;
  }

  addAlbum(albumId: string): void {
    this.db.favorites.albums.push(albumId);
  }

  isFavoriteAlbum(albumId: string): boolean {
    return this.findIndex(this.db.favorites.albums, albumId) >= 0;
  }

  deleteAlbum(albumId: string): boolean {
    const index = this.findIndex(this.db.favorites.albums, albumId);

    if (index < 0) {
      return false;
    }

    this.db.favorites.albums.splice(index, 1);
    return true;
  }

  addArtist(artistId: string): void {
    this.db.favorites.artists.push(artistId);
  }

  isFavoriteArtist(artistId: string): boolean {
    return this.findIndex(this.db.favorites.artists, artistId) >= 0;
  }

  deleteArtist(artistId: string): boolean {
    const index = this.findIndex(this.db.favorites.artists, artistId);

    if (index < 0) {
      return false;
    }

    this.db.favorites.artists.splice(index, 1);
    return true;
  }

  private findIndex(arr: string[], itemId: string): number {
    return arr.findIndex((id) => id === itemId);
  }
}
