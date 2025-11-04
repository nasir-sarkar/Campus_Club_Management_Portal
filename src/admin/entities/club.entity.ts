import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() name: string;
  @Column() description: string;

  @Column() logo: string;
  @Column() category: string;

  @Column({ default: 0 })
  memberCount: number;

  @ManyToOne(() => User, (user) => user.presidentOf, { nullable: true })
  president?: User;

  @OneToMany(() => Event, (event) => event.club)
  events: Event[];
}
