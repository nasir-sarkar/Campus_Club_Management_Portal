import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ClubInfo } from '../../club-info/entitites/club-info.entity';
import { PresidentEntity } from '../../club_president/entities/president.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('club_reports')
export class ClubReportEntity {
  @PrimaryGeneratedColumn()
  cr_id: number;

  @CreateDateColumn()
  cr_date: Date;


  @Column({ type: 'bytea' })
  @IsNotEmpty({ message: 'Report file is required' })
  c_report: Buffer;



  //Relations
  @Column()
  club_id: string;

  @ManyToOne(() => ClubInfo, (club) => club.reports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'club_id' })
  club: ClubInfo;


  @Column()
  p_id: number;

  @ManyToOne(() => PresidentEntity, (president) => president.reports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'p_id' })
  president: PresidentEntity;
}
