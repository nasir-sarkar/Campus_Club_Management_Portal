import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class PresidentProfileDto {
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  bio: string;


  @IsOptional()
  @IsString({ message: 'Hobby must be a string' })
  hpbby: string;


  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;



  //Relation
  @IsNotEmpty({ message: 'President ID is required' })
  @IsNumber({}, { message: 'President ID must be a number' })
  p_id: number;
}
