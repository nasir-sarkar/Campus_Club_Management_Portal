import { Module } from '@nestjs/common';
import { PresidentController } from './president.controller';
import { PresidentService } from './president.service';
import { PresidentEntity } from './entities/president.entity';
import { EventsEntity } from '../events/entities/events.entity';
import { ClubInfo } from '../club-info/entitites/club-info.entity'; 
import { EventReportEntity } from '../report/entities/event_report.entity';
import { ClubReportEntity } from '../report/entities/club_report.entity';
import { Admin } from '../admin/entities/admin.entity';
import { MemberEntity } from '../member/entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PresidentEntity, EventsEntity, MemberEntity, EventReportEntity, ClubReportEntity, Admin, ClubInfo])],
  controllers: [PresidentController],
  providers: [PresidentService],
})
export class PresidentModule {}
