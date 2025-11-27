import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, ParseIntPipe} from '@nestjs/common';
import { PresidentService } from './president.service';
import { EventsDto } from '../events/dto/events.dto';
import { MemberDto } from '../member/dto/member.dto';
import { PresidentDto } from './dto/president.dto';
import { EventReportDto } from '../report/dto/event_report.dto';
import { ClubReportDto } from '../report/dto/club_report.dto';
import { EventReportEntity } from '../report/entities/event_report.entity';
import { ClubReportEntity } from '../report/entities/club_report.entity';
import { PresidentEntity } from './entities/president.entity';
import { EventsEntity } from '../events/entities/events.entity';
import { MemberEntity } from '../member/entities/member.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage, memoryStorage } from 'multer';
import { ClubInfo } from '../club-info/entitites/club-info.entity';

@Controller('club_president')
export class PresidentController {
  constructor(private readonly presidentService: PresidentService) {}

  //Events
  @Post('add-event')
  @UsePipes(new ValidationPipe())
  addEvent(@Body() event: EventsDto) {
    return this.presidentService.addEvent(event);
  }

  @Get('get-events')
  getAllEvents() {
    console.log('GET /club_president/get-events called');
    return this.presidentService.getAllEvents();
  }

  @Patch('update-event/:e_id')
  @UsePipes(new ValidationPipe())
  updateEvent(@Param('e_id') e_id: string, @Body() updatedEvent: EventsDto) {
    return this.presidentService.updateEvent(e_id, updatedEvent);
  }

  @Delete('delete-event/:e_id')
  deleteEvent(@Param('e_id') e_id: string) {
    return this.presidentService.deleteEvent(e_id);
  }



  //President
  @Patch('update-president/:p_id')
  updatePresident(@Param('p_id') p_id: number, @Body() updatedPresident: PresidentDto) {
    return this.presidentService.updatePresident(p_id, updatedPresident);
  }



  //Event Reports
  @Post('add-event-report')
  @UseInterceptors(
    FileInterceptor('e_report', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(pdf)$/)) cb(null, true);
        else cb(new Error('Only PDF files are allowed'), false);
      },
    }),
  )  
  @UsePipes(new ValidationPipe())
  addEventReport(
    @UploadedFile() file: Express.Multer.File,
    @Body('e_id') e_id: string,
    @Body('p_id', ParseIntPipe) p_id: number,
  ) {
    const dto: EventReportDto = { e_id, p_id };
    return this.presidentService.addEventReport(file, dto);
  }


  
  @Put('update-event-report/:er_id')
  @UseInterceptors(
    FileInterceptor('e_report', {
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(pdf)$/)) cb(null, true);
        else cb(new Error('Only PDF files are allowed'), false);
      },
    }),
  )
  @UsePipes(new ValidationPipe())
  updateEventReport(
    @Param('er_id', ParseIntPipe) er_id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body('e_id') e_id: string,
    @Body('p_id', ParseIntPipe) p_id: number,
  ) {
    const dto: EventReportDto = { e_id, p_id };
    return this.presidentService.updateEventReport(er_id, file, dto);
  }






  //Members
  @Post('add-member')
  @UsePipes(new ValidationPipe())
  addMember(@Body() member: MemberDto) {
    return this.presidentService.addMember(member);
  }

  @Get('get-members')
  getAllMembers() {
    return this.presidentService.getAllMembers();
  }

  @Patch('update-member/:m_id')
  @UsePipes(new ValidationPipe())
  updateMember(@Param('m_id') m_id: number, @Body() updatedMember: MemberDto) {
    return this.presidentService.updateMember(m_id, updatedMember);
  }

  @Delete('delete-member/:m_id')
  deleteMember(@Param('m_id') m_id: number) {
    return this.presidentService.deleteMember(m_id);
  }


}

