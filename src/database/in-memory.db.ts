import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InMemoryDB {
  private static instance: InMemoryDB;

  public users: User[] = [];

  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }

    return InMemoryDB.instance;
  }
}
