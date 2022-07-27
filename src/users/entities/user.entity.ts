import { Exclude, Type } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Type(() => Number)
  createdAt: Date;

  @UpdateDateColumn()
  @Type(() => Number)
  updatedAt: Date;
}
