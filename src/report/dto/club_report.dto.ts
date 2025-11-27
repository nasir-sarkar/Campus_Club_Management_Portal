import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ClubReportDto {
  @IsNotEmpty({ message: 'Report file is required' })
  c_report: Buffer;

  @IsNotEmpty({ message: 'Club ID cannot be empty' })
  @IsString({ message: 'Club ID must be a string' })
  club_id: string;

  @IsNotEmpty({ message: 'President ID cannot be empty' })
  @IsNumber({}, { message: 'President ID must be a number' })
  p_id: number;
}
