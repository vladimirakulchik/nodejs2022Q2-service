import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async findAll(): Promise<Album[]> {
    return await this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album: Album | null = await this.albumsRepository.findOneBy({
      id,
    });

    if (!album) {
      throw new NotFoundException(`Album ${id} not found.`);
    }

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const album: Album = this.albumsRepository.create(createAlbumDto);

      return await this.albumsRepository.save(album);
    } catch (error) {
      throw new BadRequestException('Invalid album data.');
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    await this.findOne(id);

    try {
      await this.albumsRepository.update(id, updateAlbumDto);
    } catch (error) {
      throw new BadRequestException('Invalid album data.');
    }

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.albumsRepository.delete(id);
  }
}
