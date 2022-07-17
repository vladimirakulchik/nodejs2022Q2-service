import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesRepository } from 'src/favorites/repository/favorites.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumsRepository } from './repository/albums.repository';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    @Inject(forwardRef(() => FavoritesRepository))
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  findAll(): Album[] {
    return this.albumsRepository.findAll();
  }

  findOne(id: string): Album {
    const album: Album | undefined = this.albumsRepository.findOne(id);

    if (!album) {
      throw new NotFoundException(`Album ${id} not found.`);
    }

    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.albumsRepository.create(createAlbumDto);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    this.findOne(id);

    return this.albumsRepository.update(id, updateAlbumDto);
  }

  remove(id: string): void {
    this.findOne(id);
    this.albumsRepository.remove(id);
    this.favoritesRepository.deleteAlbum(id);
  }
}
