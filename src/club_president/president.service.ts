import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { EventsDto } from '../events/dto/events.dto';
import { MemberDto } from '../member/dto/member.dto';
import { PresidentDto } from './dto/president.dto';
import { EventReportDto } from '../report/dto/event_report.dto';
import { ClubReportDto } from '../report/dto/club_report.dto';
import { EventReportEntity } from '../report/entities/event_report.entity';
import { ClubReportEntity } from '../report/entities/club_report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, MoreThan } from 'typeorm';
import { PresidentEntity } from './entities/president.entity';
import { EventsEntity } from '../events/entities/events.entity';
import { MemberEntity } from '../member/entities/member.entity';
import { ClubInfo } from '../club-info/entitites/club-info.entity';



@Injectable()
export class PresidentService {

  constructor(@InjectRepository(EventsEntity) private eventRepository: Repository<EventsEntity>, @InjectRepository(PresidentEntity) private presidentRepository: Repository<PresidentEntity>, @InjectRepository(EventReportEntity)
    private readonly eventReportRepository: Repository<EventReportEntity>, @InjectRepository(ClubInfo) private presRepository: Repository<ClubInfo>, @InjectRepository(MemberEntity) private readonly memberRepository: Repository<MemberEntity>,) {}

  //Events
  async addEvent(event: EventsDto): Promise<EventsEntity> {
    return this.eventRepository.save(event);
  }


  async getAllEvents(): Promise<EventsEntity[]> {
    return this.eventRepository.find();
  }


  async updateEvent(e_id: string, updatedEvent: EventsDto): Promise<EventsEntity | null> {
    await this.eventRepository.update({ e_id }, updatedEvent);
    return this.eventRepository.findOneBy({ e_id });
  }


  async deleteEvent(e_id: string): Promise<void> {
    await this.eventRepository.delete({ e_id });
  }





  //Predent
  async updatePresident(p_id: number, updatedPresident: PresidentDto): Promise<PresidentEntity | null> {
    await this.presidentRepository.update({ p_id }, updatedPresident);
    return this.presidentRepository.findOneBy({ p_id });
  }




  //Event Reports
  async addEventReport(file: Express.Multer.File, dto: EventReportDto) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const newReport = this.eventReportRepository.create({
      e_report: file.buffer,
      e_id: dto.e_id,
      p_id: dto.p_id,
    });

    return await this.eventReportRepository.save(newReport);
  }



  async updateEventReport(
    er_id: number,
    file: Express.Multer.File,
    dto: EventReportDto,
  ) {
    const report = await this.eventReportRepository.findOne({ where: { er_id } });
    if (!report) {
      throw new HttpException('Event report not found', HttpStatus.NOT_FOUND);
    }

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    report.e_report = file.buffer;
    report.e_id = dto.e_id;
    report.p_id = dto.p_id;

    return await this.eventReportRepository.save(report);
  }







  //Members
  async addMember(member: MemberDto): Promise<MemberEntity> {
    return this.memberRepository.save(member);
  }

  async getAllMembers(): Promise<MemberEntity[]> {
    return this.memberRepository.find({ relations: ['president', 'club'] });
  }

  async updateMember(m_id: number, updatedMember: MemberDto): Promise<MemberEntity | null> {
    await this.memberRepository.update({ m_id }, updatedMember);
    return this.memberRepository.findOneBy({ m_id });
  }

  async deleteMember(m_id: number): Promise<void> {
    await this.memberRepository.delete({ m_id });
  }
}
