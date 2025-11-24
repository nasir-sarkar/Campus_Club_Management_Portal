import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phone?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  role?: string;

  @IsOptional()
  dob?: Date;
}
