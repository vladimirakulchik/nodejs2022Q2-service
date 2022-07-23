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
  // getFavorites(): FavoritesDto {
  //   return this.favoritesService.getFavorites();
  // }

  // @Post('track/:id')
  // addTrack(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ): AddResult {
  //   return this.favoritesService.addTrack(id);
  // }

  // @Delete('track/:id')
  // @HttpCode(StatusCodes.NO_CONTENT)
  // deleteTrack(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ): void {
  //   this.favoritesService.deleteTrack(id);
  // }

  // @Post('album/:id')
  // addAlbum(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ): AddResult {
  //   return this.favoritesService.addAlbum(id);
  // }

  // @Delete('album/:id')
  // @HttpCode(StatusCodes.NO_CONTENT)
  // deleteAlbum(
  //   @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  // ): void {
  //   this.favoritesService.deleteAlbum(id);
  // }

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
