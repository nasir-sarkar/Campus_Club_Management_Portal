import { IsOptional, IsString } from 'class-validator';

export class UpdateClubDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
