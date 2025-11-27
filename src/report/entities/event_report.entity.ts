import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { EventsEntity } from '../../events/entities/events.entity';
import { PresidentEntity } from '../../club_president/entities/president.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('event_reports')
export class EventReportEntity {
  @PrimaryGeneratedColumn()
  er_id: number;

  @CreateDateColumn()
  er_date: Date;


  @Column({ type: 'bytea' })
  @IsNotEmpty({ message: 'Report file is required' })
  e_report: Buffer;



  //Relations
  @Column()
  e_id: string;  

  @OneToOne(() => EventsEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'e_id' })  
  event: EventsEntity;

  
  @OneToOne(() => PresidentEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'p_id' }) 
  president: PresidentEntity;

  @Column()
  p_id: number;  
}
