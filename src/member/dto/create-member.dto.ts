import{IsString, IsInt, IsEmail, Min, Max, Matches, IsOptional, IsUrl, IsDateString} from 'class-validator';
export class CreateMemberDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name can only contain letters and spaces' })  
  name: string;

  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  @Matches(/^(?=.*[@#$&]).+$/, { message: 'Password must contain at least one special character (@, #, $, &)' })
  password: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format' })
  dob?: string; // Date of Birth

  @IsOptional()
  @IsUrl({}, { message: 'Invalid URL format' })
  facebook?: string;

}
