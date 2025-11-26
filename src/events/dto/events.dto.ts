import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class EventsDto {
  
  @IsNotEmpty()
  @IsString()
  e_name: string;

  @IsNotEmpty()
  @IsString()
  e_contact: string;

  @IsNotEmpty()
  @IsDateString()
  event_date: string;

  @IsOptional()
  @IsString()
  e_category?: string;

  @IsOptional()
  @IsString()
  e_description?: string;

  @IsNotEmpty()
  @IsString()
  club_id: string;
}

