import { v4 as generateId } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../entities/user.entity';
import { InMemoryDB } from 'src/database/in-memory.db';

@Injectable()
export class UsersRepository {
  constructor(private db: InMemoryDB) {}

  findAll(): User[] {
    return this.db.users;
  }

  findOne(id: string): User | undefined {
    return this.db.users.find((user) => {
      return user.id === id;
    });
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = new User();
    newUser.id = generateId();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    newUser.version = 1;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();

    this.db.users.push(newUser);

    return newUser;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User | undefined {
    const index = this.findIndex(id);

    if (index >= 0) {
      const user: User = this.db.users[index];

      user.password = updatePasswordDto.newPassword;
      user.updatedAt = Date.now();
      user.version++;

      this.db.users[index] = user;
    }

    return this.db.users[index];
  }

  remove(id: string): void {
    const index = this.findIndex(id);

    if (index >= 0) {
      this.db.users.splice(index, 1);
    }
  }

  private findIndex(id: string): number {
    return this.db.users.findIndex((user) => {
      return id === user.id;
    });
  }
}
