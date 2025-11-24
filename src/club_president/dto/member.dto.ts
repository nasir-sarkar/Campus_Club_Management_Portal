import { IsString, Matches, Length, IsDateString } from 'class-validator';

export class MemberDto {

  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must not contain any number or special character' })
  memberName: string;

  @IsString()
  memberUsername: string;

  @IsString()
  memberId: string;

  
  @Matches(/^(?=.*[a-z])(?=.*[@#$&]).{6,}$/, {message:'Password must be at least 6 characters long, contain one lowercase letter, and one special character (@, #, $, &)',})
  memberPassword: string;

  @IsString()
  memberRole: string;

  
  @IsDateString({}, { message: 'DOB must be a valid date string (YYYY-MM-DD)' })
  memberDOB: string;


  @Matches(/^01[0-9]{9}$/, {message: 'Phone number must start with 01 and contain only numbers (total 11 digits)',})
  memberPhone: string;
}
