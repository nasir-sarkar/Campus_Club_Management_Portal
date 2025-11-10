import { IsString, IsDateString } from 'class-validator';

export class EventDto {
  @IsString()
  eventId: string;

  @IsString()
  eventName: string;

  @IsString()
  eventCategory: string;

  @IsDateString({}, { message: 'Invalid date format.' })
  eventDate: string;
}
