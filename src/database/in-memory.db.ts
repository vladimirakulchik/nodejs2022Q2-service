import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InMemoryDB {
  private static instance: InMemoryDB;

  public users: User[] = [];
  public artists: Artist[] = [];
  public albums: Album[] = [];

  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }

    return InMemoryDB.instance;
  }
}
