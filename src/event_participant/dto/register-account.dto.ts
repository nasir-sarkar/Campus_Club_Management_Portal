
import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
export class RegisterAccountDto {
  @IsString()
  @Matches(/^[A-Za-z ]+$/, { message: 'Name should contain only alphabets and spaces' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Matches(/^\d{10,17}$/, { message: 'NID number must be 10-17 digits' })
  nidNumber: string;
}

