import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  findAll(): User[] {
    return this.usersRepository.findAll();
  }

  findOne(id: string): User | undefined {
    return this.usersRepository.findOne(id);
  }

  create(createUserDto: CreateUserDto): User {
    return this.usersRepository.create(createUserDto);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User | undefined {
    return this.usersRepository.update(id, updatePasswordDto);
  }

  remove(id: string): void {
    return this.usersRepository.remove(id);
  }
}
