import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { SignupResult } from './interfaces/signup-result.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByLogin(login);

    if (user) {
      // && user.password === password

      return user;
    }

    return null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<SignupResult> {
    const user = await this.usersService.create(createUserDto);

    return {
      result: `User ${user.login} was created.`,
    };
  }

  async login(user: User) {
    const payload = { userId: user.id, login: user.login };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: '12345',
        noTimestamp: true,
        expiresIn: '1h',
      }),
    };
  }
}
