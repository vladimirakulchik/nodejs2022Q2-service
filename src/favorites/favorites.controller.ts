import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavoritesDto } from './dto/favorites-dto';
import { FavoritesService } from './favorites.service';
import { AddResult } from './interfaces/add-result.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // @Get()
  // async getFavorites(): Promise<FavoritesDto> {
  //   return await this.favoritesService.getFavorites();
  // }

  // @Post('track/:id')
  // async addTrack(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ): Promise<AddResult> {
  //   return await this.favoritesService.addTrack(id);
  // }

  // @Delete('track/:id')
  // @HttpCode(StatusCodes.NO_CONTENT)
  // async deleteTrack(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ): Promise<void> {
  //   await this.favoritesService.deleteTrack(id);
  // }

  @Post('album/:id')
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<AddResult> {
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<AddResult> {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.favoritesService.deleteArtist(id);
  }
}
