import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist: Artist | null = await this.artistsRepository.findOneBy({
      id,
    });

    if (!artist) {
      throw new NotFoundException(`Artist ${id} not found.`);
    }

    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist: Artist = this.artistsRepository.create(createArtistDto);

    return await this.artistsRepository.save(artist);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    await this.findOne(id);
    await this.artistsRepository.update(id, updateArtistDto);

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.artistsRepository.delete(id);
  }
}
