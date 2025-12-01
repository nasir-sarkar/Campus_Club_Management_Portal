import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, } from 'typeorm';
import { ClubInfo } from '../../club-info/entitites/club-info.entity';
import { EventsEntity } from '../../events/entities/events.entity';
import { MemberEntity } from '../../member/entities/member.entity';
import { IsNotEmpty, IsEmail, Matches, MinLength, IsOptional, Validate, } from 'class-validator';
import { PresidentProfileEntity } from '../../club_president/entities/president_profile.entity';


@Entity('presidents')
export class PresidentEntity {

  @PrimaryGeneratedColumn()
  p_id: number;


  @Column({ unique: true })
  @IsNotEmpty({ message: 'Username cannot be empty' })
  p_username: string;


  @Column()
  @Matches(/^[A-Za-z ]+$/, { message: 'Name can only contain letters and spaces' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  p_name: string;


  @Column({ unique: true })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  p_email: string;


  @Column()
  @Matches(/^01\d{9}$/, { message: 'Phone must start with 01 and be 11 digits long' })
  @IsNotEmpty({ message: 'Phone cannot be empty' })
  p_phone: string;


  @Column()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  p_password: string;


  @Column({ type: 'date', nullable: true })
  @IsNotEmpty({ message: 'Date of Birth cannot be empty' })
  p_dob: Date;





  //Relations

  @Column()
  club_id: string;

  @OneToOne(() => ClubInfo, (club) => club.president, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: ClubInfo;


  @OneToMany(() => EventsEntity, (event) => event.club)
  events: EventsEntity[];


  @OneToMany(() => MemberEntity, (member) => member.president)
  members: MemberEntity[];

  
  @OneToOne(() => PresidentProfileEntity, (profile) => profile.president, { cascade: true })
  profile: PresidentProfileEntity;
}
