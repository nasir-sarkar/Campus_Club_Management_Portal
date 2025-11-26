import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile} from '@nestjs/common';
import { PresidentService } from './president.service';
import { MemberDto } from './dto/member.dto';
import { ClubDto } from './dto/club.dto';
import { EventsDto } from '../events/dto/events.dto';
import { EventsEntity } from '../events/entities/events.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ClubInfo } from '../club-info/entitites/club-info.entity';

@Controller('club_president')
export class PresidentController {
  constructor(private readonly presidentService: PresidentService) {}


  @Post('add-event')
  addEvent(@Body() event: EventsEntity) {
    return this.presidentService.addEvent(event);
  }


  @Get('get-events')
  getAllEvents() {
    console.log('GET /club_president/get-events called');
    return this.presidentService.getAllEvents();
  }


  @Patch('update-event/:e_id')
  updateEvent(@Param('e_id') e_id: string, @Body() updatedEvent: EventsEntity) {
    return this.presidentService.updateEvent(e_id, updatedEvent);
  }


  @Delete('delete-event/:e_id')
  deleteEvent(@Param('e_id') e_id: string) {
    return this.presidentService.deleteEvent(e_id);
  }
}

