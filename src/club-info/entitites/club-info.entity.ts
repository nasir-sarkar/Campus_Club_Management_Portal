import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Admin } from '../../admin/entities/admin.entity';
import { PresidentEntity } from '../../club_president/entities/president.entity';
import { EventsEntity } from '../../club_president/entities/events.entity';



@Entity('club_info')
export class ClubInfo {
  @PrimaryGeneratedColumn('uuid')
  club_id: string;

  @Column()
  admin_id: string;

  @ManyToOne(() => Admin, (admin) => admin.clubs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Column()
  club_name: string;

  @Column({ type: 'text', nullable: true })
  club_description: string;

  @Column({ default: true })
  active_status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: 0 })
  members_count: number;

  @Column({ nullable: true })
  club_category: string;


  @OneToMany(() => PresidentEntity, (president) => president.club)
  presidents: PresidentEntity[];

  @OneToMany(() => EventsEntity, (event) => event.club)
  events: EventsEntity[];

}
