import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { PresidentService } from './president.service';
import { MemberDto } from './dto/member.dto';
import { ClubDto } from './dto/club.dto';
import { EventDto } from './dto/event.dto';

@Controller('club_president')
export class PresidentController {
  constructor(private readonly presidentService: PresidentService) {}


  @Post('add-member')
  addMember(@Body() member: MemberDto) {
    return this.presidentService.addMember(member);
  }


  @Delete('delete-member/:memberId')
  deleteMember(@Param('memberId') memberId: string) {
    return this.presidentService.deleteMember(memberId);
  }


  @Post('create-event')
  createEvent(@Body() event: EventDto) {
    return this.presidentService.createEvent(event);
  }


  @Put('update-event/:eventId')
  updateEvent(@Param('eventId') eventId: string, @Body() event: EventDto) {
    return this.presidentService.updateEvent(eventId, event);
  }


  @Delete('delete-event/:eventId')
  deleteEvent(@Param('eventId') eventId: string) {
    return this.presidentService.deleteEvent(eventId);
  }
 

  @Put('update-club/:clubId')
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


  @Get('view-report')
  viewReport(@Query('clubId') clubId: string, @Query('clubReport') clubReport: string) {
    return this.presidentService.viewReport(clubId, clubReport);
 }


}
