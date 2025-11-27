import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, } from 'typeorm';
import { ClubInfo } from '../../club-info/entitites/club-info.entity';
import { PresidentEntity } from '../../club_president/entities/president.entity';
import { EventReportEntity } from '../../report/entities/event_report.entity';
import { IsNotEmpty, Matches, IsOptional } from 'class-validator';

@Entity('events')
export class EventsEntity {
  
  @PrimaryGeneratedColumn("uuid")
  e_id: string;


  @Column()
  @Matches(/^[A-Za-z ]+$/, { message: 'Event name can only contain letters and spaces' })
  @IsNotEmpty({ message: 'Event name cannot be empty' })
  e_name: string;


  @Column()
  @Matches(/^01\d{9}$/, { message: 'Contact must start with 01 and be 11 digits long' })
  @IsNotEmpty({ message: 'Event contact cannot be empty' })
  e_contact: string;


  @Column({ type: 'date' })
  @IsNotEmpty({ message: 'Event date cannot be empty' })
  event_date: Date;


  @Column({ nullable: true })
  @Matches(/^[A-Za-z ]+$/, { message: 'Category can only contain letters and spaces' })
  @IsNotEmpty({ message: 'Category cannot be empty' })
  e_category: string;


  @Column({ type: 'text' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  e_description: string;


  @CreateDateColumn()
  created_at: Date;


  

  //Relations
  @Column()
  club_id: string;

  @ManyToOne(() => ClubInfo, (club) => club.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: ClubInfo;

  
  @Column({})
  p_id: number;

  @ManyToOne(() => PresidentEntity, (president) => president.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'p_id' })
  president: PresidentEntity;

  
  @OneToOne(() => EventReportEntity, (report) => report.event)
  report: EventReportEntity;

}
