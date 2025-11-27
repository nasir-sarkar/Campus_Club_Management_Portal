import { IsNotEmpty, IsEmail, Matches, MinLength, } from 'class-validator';

export class MemberDto {
  
  @IsNotEmpty({ message: 'Username cannot be empty' })
  m_username: string;


  @Matches(/^[A-Za-z ]+$/, { message: 'Name can only contain letters and spaces' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  m_name: string;


  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  m_email: string;


  @Matches(/^01\d{9}$/, { message: 'Phone must start with 01 and be 11 digits long' })
  @IsNotEmpty({ message: 'Phone cannot be empty' })
  m_phone: string;


  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  m_password: string;


  @IsNotEmpty({ message: 'Date of Birth cannot be empty' })
  m_dob: Date;



  // Relations
  @IsNotEmpty({ message: 'Club ID cannot be empty' })
  club_id: string;


  @IsNotEmpty({ message: 'President ID cannot be empty' })
  p_id: number;
}
