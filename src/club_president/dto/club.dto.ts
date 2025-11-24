import { IsString } from 'class-validator';

export class ClubDto {
  @IsString()
  clubId: string;

  @IsString()
  clubName: string;

  @IsString()
  clubReport: string;
}
