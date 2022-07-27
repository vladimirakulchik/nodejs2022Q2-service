import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  @IsOptional()
  artistId: string;

  @IsUUID('4')
  @IsOptional()
  albumId: string;

  @IsInt()
  @IsPositive()
  duration: number;
}
