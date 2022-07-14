import { v4 as generateId } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((user) => {
      return user.id === id;
    });
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = new User();
    newUser.id = generateId();
    newUser.login = createUserDto.login;
    newUser.password = createUserDto.password;
    newUser.version = 0;
    newUser.createdAt = Date.now();
    newUser.updatedAt = Date.now();

    this.users.push(newUser);

    return newUser;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User | undefined {
    const index = this.findIndex(id);

    if (index >= 0) {
      this.users[index].password = updatePasswordDto.newPassword;
      this.users[index].updatedAt = Date.now();
      this.users[index].version++;
    }

    return this.users[index];
  }

  remove(id: string): void {
    const index = this.findIndex(id);

    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  private findIndex(id: string): number {
    return this.users.findIndex((user) => {
      return id === user.id;
    });
  }
}
