import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistsRepository } from './repository/artists.repository';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  findAll(): Artist[] {
    return this.artistsRepository.findAll();
  }

  findOne(id: string): Artist {
    const artist: Artist | undefined = this.artistsRepository.findOne(id);

    if (!artist) {
      throw new NotFoundException(`Artist ${id} not found.`);
    }

    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    return this.artistsRepository.create(createArtistDto);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    this.findOne(id);

    return this.artistsRepository.update(id, updateArtistDto);
  }

  remove(id: string): void {
    this.findOne(id);
    this.artistsRepository.remove(id);
  }
}
