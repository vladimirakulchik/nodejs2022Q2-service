import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
