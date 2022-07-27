import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  year: number;

  @IsUUID('4')
  @IsOptional()
  artistId: string;
}
