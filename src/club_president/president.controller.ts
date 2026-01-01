import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, ParseIntPipe, UseGuards, Request} from '@nestjs/common';
import { PresidentService } from './president.service';
import { EventsDto } from '../events/dto/events.dto';
import { MemberDto } from '../member/dto/member.dto';
import { PresidentDto } from './dto/president.dto';
import { PresidentProfileDto } from './dto/president_profile.dto';
import { JwtAuthGuard } from '../president_auth/jwt.guard';
import { SessionGuard } from './session.guard';


@Controller('club_president')
export class PresidentController {
  constructor(private readonly presidentService: PresidentService) {}
  
  
  //Events
  @UseGuards(JwtAuthGuard, SessionGuard)
  @Post('add-event')
  addEvent(@Body() event: EventsDto, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.addEvent(event);
  }

  @UseGuards(JwtAuthGuard, SessionGuard)
  @Patch('update-event/:e_id')
  updateEvent(@Param('e_id') e_id: string, @Body() updatedEvent: EventsDto, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.updateEvent(e_id, updatedEvent);
  }

  @UseGuards(JwtAuthGuard, SessionGuard)
  @Get('get-members')
  getAllMembers(@Request() req) {
    console.log(req.user.email);
    return this.presidentService.getAllMembers();
  }

  @UseGuards(JwtAuthGuard, SessionGuard)
  @Delete('delete-event/:e_id')
  deleteEvent(@Param('e_id') e_id: string, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.deleteEvent(e_id);
  }






  
   //President
  @UseGuards(JwtAuthGuard, SessionGuard)
  @Patch('update-president/:p_id')
  updatePresident(@Param('p_id') p_id: number, @Body() updatedPresident: PresidentDto, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.updatePresident(p_id, updatedPresident);
  }

  @UseGuards(JwtAuthGuard, SessionGuard)
  @Post('add-profile')
  addProfile(@Body() profile: PresidentProfileDto, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.addProfile(profile);
  }


  @UseGuards(JwtAuthGuard, SessionGuard)
  @Patch('update-profile/:profile_id')
  updateProfile(@Param('profile_id') profile_id: number, @Body() updatedProfile: PresidentProfileDto, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.updateProfile(profile_id, updatedProfile);
  }


  @UseGuards(JwtAuthGuard, SessionGuard)
  @Get('view-profile')
  viewProfile(@Request() req) {
    return this.presidentService.viewProfile(req.user.email);
  }







  //Members
  @UseGuards(JwtAuthGuard, SessionGuard)
  @Post('add-member')
  addMember(@Body() member: MemberDto, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.addMember(member);
  }

  @UseGuards(JwtAuthGuard, SessionGuard)
  @Patch('update-member/:m_id')
  updateMember(@Param('m_id') m_id: number, @Body() updatedMember: MemberDto, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.updateMember(m_id, updatedMember);
  }

  @UseGuards(JwtAuthGuard, SessionGuard)
  @Get('get-events')
  getAllEvents(@Request() req) {
    console.log(req.user.email);
    return this.presidentService.getAllEvents();
  }

  @UseGuards(JwtAuthGuard, SessionGuard)
  @Delete('delete-member/:m_id')
  deleteMember(@Param('m_id') m_id: number, @Request() req) {
    console.log(req.user.email);
    return this.presidentService.deleteMember(m_id);
  }

}

