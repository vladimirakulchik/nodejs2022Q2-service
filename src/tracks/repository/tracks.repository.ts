import { v4 as generateId } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InMemoryDB } from 'src/database/in-memory.db';
import { Track } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TracksRepository {
  constructor(private db: InMemoryDB) {}

  findAll(): Track[] {
    return this.db.tracks;
  }

  findOne(id: string): Track | undefined {
    return this.db.tracks.find((track) => {
      return track.id === id;
    });
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = new Track();
    newTrack.id = generateId();
    newTrack.name = createTrackDto.name;
    newTrack.artistId = createTrackDto.artistId ?? null;
    newTrack.albumId = createTrackDto.albumId ?? null;
    newTrack.duration = createTrackDto.duration;

    this.db.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track | undefined {
    const index = this.findIndex(id);

    if (index >= 0) {
      const track: Track = this.db.tracks[index];

      track.name = updateTrackDto.name ?? track.name;
      track.artistId = updateTrackDto.artistId ?? track.artistId;
      track.albumId = updateTrackDto.albumId ?? track.albumId;
      track.duration = updateTrackDto.duration ?? track.duration;

      this.db.tracks[index] = track;
    }

    return this.db.tracks[index];
  }

  remove(id: string): void {
    const index = this.findIndex(id);

    if (index >= 0) {
      this.db.tracks.splice(index, 1);
    }
  }

  private findIndex(id: string): number {
    return this.db.tracks.findIndex((track) => {
      return id === track.id;
    });
  }
}
