import { v4 as generateId } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { Album } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumsRepository {
  constructor(private db: InMemoryDB) {}

  findAll(): Album[] {
    return this.db.albums;
  }

  findOne(id: string): Album | undefined {
    return this.db.albums.find((album) => {
      return album.id === id;
    });
  }

  findByIds(albumsIds: string[]): Album[] {
    return this.db.albums.filter((album) => albumsIds.includes(album.id));
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = new Album();
    newAlbum.id = generateId();
    newAlbum.name = createAlbumDto.name;
    newAlbum.year = createAlbumDto.year;
    newAlbum.artistId = createAlbumDto.artistId ?? null;

    this.db.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album | undefined {
    const index = this.findIndex(id);

    if (index >= 0) {
      const album: Album = this.db.albums[index];

      album.name = updateAlbumDto.name ?? album.name;
      album.year = updateAlbumDto.year ?? album.year;
      album.artistId = updateAlbumDto.artistId ?? album.artistId;

      this.db.albums[index] = album;
    }

    return this.db.albums[index];
  }

  remove(id: string): void {
    const index = this.findIndex(id);

    if (index >= 0) {
      this.db.albums.splice(index, 1);
    }
  }

  isExist(id: string): boolean {
    return this.findIndex(id) >= 0;
  }

  private findIndex(id: string): number {
    return this.db.albums.findIndex((album) => {
      return id === album.id;
    });
  }
}
