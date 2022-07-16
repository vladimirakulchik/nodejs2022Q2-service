import { v4 as generateId } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistsRepository {
  constructor(private db: InMemoryDB) {}

  findAll(): Artist[] {
    return this.db.artists;
  }

  findOne(id: string): Artist | undefined {
    return this.db.artists.find((artist) => {
      return artist.id === id;
    });
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = new Artist();
    newArtist.id = generateId();
    newArtist.name = createArtistDto.name;
    newArtist.grammy = createArtistDto.grammy;

    this.db.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist | undefined {
    const index = this.findIndex(id);

    if (index >= 0) {
      const artist: Artist = this.db.artists[index];

      artist.name = updateArtistDto.name ?? artist.name;
      artist.grammy = updateArtistDto.grammy ?? artist.grammy;

      this.db.artists[index] = artist;
    }

    return this.db.artists[index];
  }

  remove(id: string): void {
    const index = this.findIndex(id);

    if (index >= 0) {
      this.db.artists.splice(index, 1);
    }

    this.removeFromAlbums(id);
  }

  private findIndex(id: string): number {
    return this.db.artists.findIndex((artist) => {
      return id === artist.id;
    });
  }

  private removeFromAlbums(artistId: string): void {
    const index = this.db.albums.findIndex((album) => {
      return artistId === album.artistId;
    });

    if (index >= 0) {
      this.db.albums[index].artistId = null;
    }
  }
}
