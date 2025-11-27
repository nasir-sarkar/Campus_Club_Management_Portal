import { IsNotEmpty, Matches, IsOptional, IsDateString } from 'class-validator';

export class EventsDto {

  @IsNotEmpty({ message: 'Event name cannot be empty' })
  @Matches(/^[A-Za-z ]+$/, { message: 'Event name can only contain letters and spaces' })
  e_name: string;


  @IsNotEmpty({ message: 'Event contact cannot be empty' })
  @Matches(/^01\d{9}$/, { message: 'Contact must start with 01 and be 11 digits long' })
  e_contact: string;


  @IsNotEmpty({ message: 'Event date cannot be empty' })
  @IsDateString({}, { message: 'Event date must be a valid date' })
  event_date: Date;


  @IsOptional()
  @Matches(/^[A-Za-z ]+$/, { message: 'Category can only contain letters and spaces' })
  e_category?: string;


  @IsNotEmpty({ message: 'Description cannot be empty' })
  e_description: string;


  @IsNotEmpty({ message: 'Club ID cannot be empty' })
  club_id: string;

  
  @IsNotEmpty({ message: 'President ID cannot be empty' })
  p_id: number;
}
