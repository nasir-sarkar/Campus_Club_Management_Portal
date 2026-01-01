import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { MailerModule } from '@nestjs-modules/mailer';
import { EventsDto } from '../events/dto/events.dto';
import { MemberDto } from '../member/dto/member.dto';
import { PresidentDto } from './dto/president.dto';
import { PresidentProfileDto } from './dto/president_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, MoreThan } from 'typeorm';
import { PresidentEntity } from './entities/president.entity';
import { PresidentProfileEntity } from './entities/president_profile.entity';
import { EventsEntity } from '../events/entities/events.entity';
import { MemberEntity } from '../member/entities/member.entity';

@Injectable()
export class PresidentService {

  constructor(
  @InjectRepository(EventsEntity) private eventRepository: Repository<EventsEntity>, 
  @InjectRepository(PresidentEntity) private presidentRepository: Repository<PresidentEntity>,
  private readonly mailerService: MailerService, 
  @InjectRepository(PresidentProfileEntity) private presidentProfileRepository: Repository<PresidentProfileEntity>, 
  @InjectRepository(MemberEntity) private readonly memberRepository: Repository<MemberEntity>,) {}
  
  async findByEmail(email: string): Promise<PresidentEntity | null> {
    return this.presidentRepository.findOne({ 
      where: { 
        p_email: email 
      } 
    });
  }  
  



  //Events
  async addEvent(event: EventsDto): Promise<EventsEntity> {
    return this.eventRepository.save(event);
  }


  async updateEvent(e_id: string, updatedEvent: EventsDto): Promise<EventsEntity | null> {
    await this.eventRepository.update({ e_id }, updatedEvent);
    return this.eventRepository.findOneBy({ e_id });
  }


  async getAllEvents(): Promise<EventsEntity[]> {
    return this.eventRepository.find({ relations: ['club'] });
  }


  async deleteEvent(e_id: string): Promise<void> {
    await this.eventRepository.delete({ e_id });
  }






  //Predent
  async updatePresident(p_id: number, updatedPresident: PresidentDto): Promise<PresidentEntity | null> {

    if (updatedPresident.p_password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updatedPresident.p_password, salt);
      updatedPresident.p_password = hashedPassword;
    }

    await this.presidentRepository.update({ p_id }, updatedPresident);
    return this.presidentRepository.findOneBy({ p_id });
  }


  async addProfile(profile: PresidentProfileDto): Promise<PresidentProfileEntity> {
    return this.presidentProfileRepository.save(profile);
  }


  async updateProfile(profile_id: number, updatedProfile: PresidentProfileDto): Promise<PresidentProfileEntity | null> {
    await this.presidentProfileRepository.update({ profile_id }, updatedProfile);
    return this.presidentProfileRepository.findOneBy({ profile_id });
  }


  async viewProfile(email: string) {
    const president = await this.findByEmail(email);
    if (!president) return null;
    return this.presidentProfileRepository.findOne({ where: { p_id: president.p_id } });
  }






  //Members
  async addMember(member: MemberDto): Promise<MemberEntity> {

    if (member.m_password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(member.m_password, salt);
      member.m_password = hashedPassword;
    }

    const newMember = await this.memberRepository.save(member);

    //Mailer
    await this.mailerService.sendMail({
      to: member.m_email,                     
      subject: 'Welcome to the Club!',       
      text: `Hello ${member.m_name}, your account has been created successfully!`, 
    });

    return newMember;
  }


  async updateMember(m_id: number, updatedMember: MemberDto): Promise<MemberEntity | null> {
    
    if (updatedMember.m_password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updatedMember.m_password, salt);
      updatedMember.m_password = hashedPassword;
    }

    await this.memberRepository.update({ m_id }, updatedMember);
    return this.memberRepository.findOneBy({ m_id });
  }


  async getAllMembers(): Promise<MemberEntity[]> {
    return this.memberRepository.find({ relations: ['president', 'club'] });
  }


  async deleteMember(m_id: number): Promise<void> {
    await this.memberRepository.delete({ m_id });
  }

}
