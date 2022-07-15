import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/entities/artist.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InMemoryDB {
  private static instance: InMemoryDB;

  public users: User[] = [];
  public artists: Artist[] = [];

  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }

    return InMemoryDB.instance;
  }
}
