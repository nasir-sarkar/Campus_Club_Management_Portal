import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class EventReportDto {
 
  @IsNotEmpty({ message: 'Event ID cannot be empty' })
  @IsString({ message: 'Event ID must be a string' })
  e_id: string;

  @IsNotEmpty({ message: 'President ID cannot be empty' })
  @IsNumber({}, { message: 'President ID must be a number' })
  p_id: number;
}
