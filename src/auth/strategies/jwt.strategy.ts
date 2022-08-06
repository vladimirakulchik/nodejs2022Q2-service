import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '12345',
    });
  }

  async validate(payload: any): Promise<User> {
    const userId: string = payload.userId;
    const login: string = payload.login;
    const user: User = await this.authService.findUser(userId);

    if (!user || user.login !== login) {
      return null;
    }

    return user;
  }
}
