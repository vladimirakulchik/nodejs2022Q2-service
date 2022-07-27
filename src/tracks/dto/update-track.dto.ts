import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsUUID('4')
  @IsOptional()
  artistId: string;

  @IsUUID('4')
  @IsOptional()
  albumId: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  duration: number;
}
