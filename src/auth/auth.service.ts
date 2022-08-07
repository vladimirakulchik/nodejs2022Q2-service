import { compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { authConfig } from './auth.config';
import { JwtTokens } from './interfaces/jwt-tokens.interface';
import { SignupResult } from './interfaces/signup-result.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(login: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByLogin(login);

    if (!user) {
      return null;
    }

    const isValidPassword: boolean = await compare(
      password,
      user.password ?? '',
    );

    return isValidPassword ? user : null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<SignupResult> {
    const user = await this.usersService.create(createUserDto);

    return {
      result: `User ${user.login} was created.`,
    };
  }

  async login(user: User): Promise<JwtTokens> {
    return this.generateJwtTokens(this.getPayload(user));
  }

  async findUser(id: string): Promise<User> {
    try {
      const user = await this.usersService.findOne(id);

      return user;
    } catch (error) {
      return null;
    }
  }

  private getPayload(user: User): any {
    return { userId: user.id, login: user.login };
  }

  private generateJwtTokens(payload: any): JwtTokens {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: authConfig.secretKey,
      expiresIn: authConfig.expireTime,
    });
  }

  private generateRefreshToken(payload: any): string {
    payload.refresh = true;

    return this.jwtService.sign(payload, {
      secret: authConfig.refreshSecretKey,
      expiresIn: authConfig.refreshExpireTime,
    });
  }
}
