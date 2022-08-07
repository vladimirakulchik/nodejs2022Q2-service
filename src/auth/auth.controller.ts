import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { JwtTokens } from './interfaces/jwt-tokens.interface';
import { SignupResult } from './interfaces/signup-result.interface';
import { Public } from './public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<SignupResult> {
    return this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Request() request: any): Promise<JwtTokens> {
    return this.authService.authorize(request.user);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Request() request: any): Promise<any> {
    return this.authService.authorize(request.user);
  }
}
