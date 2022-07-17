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

  deleteTrack(trackId: string): boolean {
    const index = this.db.favorites.tracks.findIndex((id) => id === trackId);

    if (index < 0) {
      return false;
    }

    this.db.favorites.tracks.splice(index, 1);
    return true;
  }

  addAlbum(albumId: string): void {
    this.db.favorites.albums.push(albumId);
  }

  deleteAlbum(albumId: string): boolean {
    const index = this.db.favorites.albums.findIndex((id) => id === albumId);

    if (index < 0) {
      return false;
    }

    this.db.favorites.albums.splice(index, 1);
    return true;
  }
}
