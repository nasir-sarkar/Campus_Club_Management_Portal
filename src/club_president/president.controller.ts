import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile} from '@nestjs/common';
import { PresidentService } from './president.service';
import { MemberDto } from './dto/member.dto';
import { ClubDto } from './dto/club.dto';
import { EventDto } from './dto/event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('club_president')
export class PresidentController {
  constructor(private readonly presidentService: PresidentService) {}


  @Post('add-member')
  @UsePipes(new ValidationPipe())
  addMember(@Body() member: MemberDto) {
    return this.presidentService.addMember(member);
  }


  @Delete('delete-member/:memberId')
  deleteMember(@Param('memberId') memberId: string) {
    return this.presidentService.deleteMember(memberId);
  }


  @Post('upload-report')
  @UseInterceptors(FileInterceptor('report-file',
  { 
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(pdf)$/)) 
        cb(null, true);
      else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'report-file'), false);
      }
    },
      limits: { fileSize: 4000000 },
      storage: diskStorage({
      destination: './uploads',
       filename: function (req, file, cb) {
       cb(null, Date.now() + file.originalname);
       },
     }),
  }))

  uploadFile(@UploadedFile() file: Express.Multer.File, @Query('clubId') clubId: string) {
    console.log(file);
  }



  @Post('create-event')
  @UsePipes(new ValidationPipe())
  createEvent(@Body() event: EventDto) {
    return this.presidentService.createEvent(event);
  }


  @Put('update-event/:eventId')
  @UsePipes(new ValidationPipe())
  updateEvent(@Param('eventId') eventId: string, @Body() event: EventDto) {
    return this.presidentService.updateEvent(eventId, event);
  }


  @Delete('delete-event/:eventId')
  deleteEvent(@Param('eventId') eventId: string) {
    return this.presidentService.deleteEvent(eventId);
  }
 

  @Put('update-club/:clubId')
  @UsePipes(new ValidationPipe())
  updateClub(@Param('clubId') clubId: string, @Body() data: ClubDto) {
    return this.presidentService.updateClub(clubId, data);
  }


  @Patch('change-member-role/:memberId')
  changeMemberRole(@Param('memberId') memberId: string, @Body() body: { memberRole: string }) {
    return this.presidentService.changeMemberRole(memberId, body.memberRole);
  }


  @Get('all-members')
  getAllMembers() {
    return this.presidentService.getAllMembers();
  }


  @Get('all-events')
  getAllEvents() {
    return this.presidentService.getAllEvents();
  }

}

