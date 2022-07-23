import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Artist, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Album, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Track, { onDelete: 'CASCADE', eager: true })
  @JoinTable()
  tracks: Track[];
}
