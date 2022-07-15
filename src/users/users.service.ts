import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  findOne(id: string): User {
    const user: User | undefined = this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found.`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto): User {
    return this.usersRepository.create(createUserDto);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user: User = this.findOne(id);

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Invalid old password was provided.');
    }

    return this.usersRepository.update(id, updatePasswordDto);
  }

  remove(id: string): void {
    this.findOne(id);
    this.usersRepository.remove(id);
  }
}
