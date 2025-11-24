import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClubInfoDto {
  @IsNotEmpty()
  admin_id: string;

  @IsNotEmpty()
  club_name: string;

  @IsOptional()
  club_description?: string;

  @IsOptional()
  active_status?: boolean;

  @IsOptional()
  members_count?: number;

  @IsOptional()
  club_category?: string;
}
