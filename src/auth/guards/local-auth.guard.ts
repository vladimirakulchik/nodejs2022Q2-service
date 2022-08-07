import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err: any, user: any) {
    if (err) {
      throw err;
    }

    if (!user) {
      throw new BadRequestException(
        'Login and password should be not empty strings.',
      );
    }

    return user;
  }
}
