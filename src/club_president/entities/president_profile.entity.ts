import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { PresidentEntity } from '../../club_president/entities/president.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Entity('president_profiles')
export class PresidentProfileEntity {
  @PrimaryGeneratedColumn()
  profile_id: number;


  @Column({ type: 'text' })
  @IsOptional()
  @IsString({ message: 'Bio must be a string' })
  bio: string;


  @Column({ type: 'text' })
  @IsOptional()
  @IsString({ message: 'Hobby must be a string' })
  hobby: string;


  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;




  // Relations
  @Column()
  @IsNotEmpty({ message: 'President ID is required' })
  p_id: number;


  @OneToOne(() => PresidentEntity, (president) => president.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'p_id' })
  president: PresidentEntity;
}
