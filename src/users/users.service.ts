import 'dotenv/config';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user: User | null = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User ${id} not found.`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await this.generateHash(createUserDto.password);

      const user: User = this.usersRepository.create(createUserDto);

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Invalid user data. Login already in use.');
    }
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user: User = await this.findOne(id);

    const matchPassword: boolean = await this.comparePassword(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!matchPassword) {
      throw new ForbiddenException('Invalid old password was provided.');
    }

    updatePasswordDto.newPassword = await this.generateHash(
      updatePasswordDto.newPassword,
    );
    user.password = updatePasswordDto.newPassword;

    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.usersRepository.delete(id);
  }

  private async generateHash(plainPassword: string): Promise<string> {
    return hash(plainPassword, +process.env.CRYPT_SALT ?? 10);
  }

  private async comparePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return compare(plainPassword, hashPassword);
  }
}
