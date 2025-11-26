import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from 'typeorm';
import { ClubInfo } from '../../club-info/entitites/club-info.entity';

@Entity('presidents')
export class PresidentEntity {
  @PrimaryGeneratedColumn()
  p_id: number;

  @Column({ unique: true })
  p_username: string;

  @Column()
  p_name: string;

  @Column({ unique: true })
  p_email: string;

  @Column()
  p_phone: string;

  @Column()
  p_password: string;

  @Column({ type: 'date', nullable: true })
  p_dob: Date;

  
  @Column()
  club_id: string;

  @ManyToOne(() => ClubInfo, (club) => club.presidents, {onDelete: 'CASCADE',})
  @JoinColumn({ name: 'club_id' })
  club: ClubInfo;
}
