import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  async findAll(): Promise<Track[]> {
    return await this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track: Track | null = await this.tracksRepository.findOneBy({
      id,
    });

    if (!track) {
      throw new NotFoundException(`Track ${id} not found.`);
    }

    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      const track: Track = this.tracksRepository.create(createTrackDto);

      return await this.tracksRepository.save(track);
    } catch (error) {
      throw new BadRequestException('Invalid track data.');
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    await this.findOne(id);

    try {
      await this.tracksRepository.update(id, updateTrackDto);
    } catch (error) {
      throw new BadRequestException('Invalid track data.');
    }

    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.tracksRepository.delete(id);
  }
}
