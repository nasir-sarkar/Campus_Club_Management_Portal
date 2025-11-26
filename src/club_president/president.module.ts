import { Module } from '@nestjs/common';
import { PresidentController } from './president.controller';
import { PresidentService } from './president.service';
import { PresidentEntity } from './entities/president.entity';
import { EventsEntity } from '../events/entities/events.entity';
import { ClubInfo } from '../club-info/entitites/club-info.entity'; 
import { ManyToOne, JoinColumn } from 'typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PresidentEntity, EventsEntity, Admin, ClubInfo])],
  controllers: [PresidentController],
  providers: [PresidentService],
})
export class PresidentModule {}
