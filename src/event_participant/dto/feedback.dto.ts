import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class FeedbackDto {
  @IsString()
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  personId: string;
}
