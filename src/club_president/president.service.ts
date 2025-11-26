import { Injectable } from '@nestjs/common';
import { MemberDto } from './dto/member.dto';
import { ClubDto } from './dto/club.dto';
import { EventsDto } from '../events/dto/events.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, MoreThan } from 'typeorm';
import { EventsEntity } from '../events/entities/events.entity';
import { ClubInfo } from '../club-info/entitites/club-info.entity';

@Injectable()
export class PresidentService {

  constructor(@InjectRepository(EventsEntity) private presidentRepository: Repository<EventsEntity>, @InjectRepository(ClubInfo) private clubInfoRepository: Repository<ClubInfo>) {}


  async addEvent(event: EventsEntity): Promise<EventsEntity> {
    return this.presidentRepository.save(event);
  }


  async getAllEvents(): Promise<EventsEntity[]> {
    return this.presidentRepository.find();
  }


  async updateEvent(e_id: string, updatedEvent: EventsEntity): Promise<EventsEntity | null> {
    await this.presidentRepository.update({ e_id }, updatedEvent);
    return this.presidentRepository.findOneBy({ e_id });
  }


  async deleteEvent(e_id: string): Promise<void> {
    await this.presidentRepository.delete({ e_id });
  }
}
