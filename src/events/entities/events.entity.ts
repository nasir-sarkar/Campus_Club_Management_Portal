import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, } from 'typeorm';
import { ClubInfo } from '../../club-info/entitites/club-info.entity';

@Entity('events')
export class EventsEntity {
  
  
  @PrimaryGeneratedColumn("uuid")
  e_id: string;

  @Column()
  e_name: string;

  @Column()
  e_contact: string;

  @Column({ type: 'date' })
  event_date: Date;

  @Column({ nullable: true })
  e_category: string;

  @Column({ type: 'text', nullable: true })
  e_description: string;

  
  @Column()
  club_id: string;

  @ManyToOne(() => ClubInfo, (club) => club.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: ClubInfo;

  @CreateDateColumn()
  created_at: Date;
}
