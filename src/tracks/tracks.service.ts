import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TracksRepository } from './repository/tracks.repository';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepository: TracksRepository) {}

  findAll(): Track[] {
    return this.tracksRepository.findAll();
  }

  findOne(id: string): Track {
    const track: Track | undefined = this.tracksRepository.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track ${id} not found.`);
    }

    return track;
  }

  create(createTrackDto: CreateTrackDto): Track {
    return this.tracksRepository.create(createTrackDto);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    this.findOne(id);

    return this.tracksRepository.update(id, updateTrackDto);
  }

  remove(id: string): void {
    this.findOne(id);
    this.tracksRepository.remove(id);
  }
}
