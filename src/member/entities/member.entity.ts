import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { ClubInfo } from '../../club-info/entitites/club-info.entity';
import { PresidentEntity } from '../../club_president/entities/president.entity';
import { IsNotEmpty, IsEmail, Matches, MinLength, IsOptional, Validate, } from 'class-validator';


@Entity('members')
export class MemberEntity {
  
  @PrimaryGeneratedColumn()
  m_id: number; 

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  m_username: string;


  @Column()
  @Matches(/^[A-Za-z ]+$/, { message: 'Name can only contain letters and spaces' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  m_name: string;


  @Column({ unique: true })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  m_email: string;


  @Column()
  @Matches(/^01\d{9}$/, { message: 'Phone must start with 01 and be 11 digits long' })
  @IsNotEmpty({ message: 'Phone cannot be empty' })
  m_phone: string;


  @Column()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  m_password: string;


  @Column({ type: 'date', nullable: true })
  @IsNotEmpty({ message: 'Date of Birth cannot be empty' })
  m_dob: Date;




  //Relations
  @Column()
  club_id: string;

  @ManyToOne(() => ClubInfo, (club) => club.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: ClubInfo;


  @Column()
  p_id: number;

  @ManyToOne(() => PresidentEntity, (president) => president.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'p_id' })
  president: PresidentEntity;
}
