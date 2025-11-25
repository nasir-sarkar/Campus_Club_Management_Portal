import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';

import { ClubInfo } from 'src/club-info/entitites/club-info.entity';

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    admin_id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column()
    password: string;

    @Column({ default: 'ADMIN' })
    role: string;

    @CreateDateColumn()
    created_at: Date;

    @Column({ type: 'date', nullable: true })
    dob: Date;

    @OneToMany(() => ClubInfo, (club) => club.admin)
    clubs: ClubInfo[];
}
