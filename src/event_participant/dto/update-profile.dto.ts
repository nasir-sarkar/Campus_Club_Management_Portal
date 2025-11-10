import { IsString, IsOptional, IsEmail, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @Matches(/^[A-Za-z ]+$/, { message: 'Name should contain only alphabets and spaces' })
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{10,17}$/, { message: 'NID number must be 10-17 digits' })
  nidNumber?: string;


}
