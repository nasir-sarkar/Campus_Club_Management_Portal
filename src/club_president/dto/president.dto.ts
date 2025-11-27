import { IsNotEmpty, IsEmail, Matches, MinLength, IsDateString } from 'class-validator';

export class PresidentDto {

  @IsNotEmpty({ message: 'Username cannot be empty' })
  p_username: string;


  @IsNotEmpty({ message: 'Name cannot be empty' })
  @Matches(/^[A-Za-z ]+$/, { message: 'Name can only contain letters and spaces' })
  p_name: string;


  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  p_email: string;


  @Matches(/^01\d{9}$/, { message: 'Phone must start with 01 and be 11 digits long' })
  @IsNotEmpty({ message: 'Phone cannot be empty' })
  p_phone: string;


  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  p_password: string;


  @IsNotEmpty({ message: 'Date of Birth cannot be empty' })
  @IsDateString({}, { message: 'DOB must be a valid date string (YYYY-MM-DD)' })
  p_dob: string;


  
  // Relations
  @IsNotEmpty({ message: 'Club ID cannot be empty' })
  club_id: string;

}
