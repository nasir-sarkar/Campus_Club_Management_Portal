import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ParseIntPipe } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PatchMemberDto } from './dto/patch-member.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  getAll() {
    return this.memberService.getAllMembers();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.getMemberById(id);
  }

  @Post()
  create(@Body() body: CreateMemberDto) {
    return this.memberService.createMember(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateMemberDto) {
    return this.memberService.updateMember(id, body);
  }

  // @Patch(':id')
  // patch(@Param('id', ParseIntPipe) id: number, @Body() body: PatchMemberDto) {
  //   return this.memberService.patchMember(id, body);
  // }

  @Patch(':id')
  patch(@Param('id', ParseIntPipe) id: number, @Body() body: PatchMemberDto) {
  return this.memberService.patchMember(id, body);
}


  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.deleteMember(id);
  }

  @Get('info/events')
  getEvents() {
    return this.memberService.getEvents();
  }

  @Get('info/notifications')
  getNotifications() {
    return this.memberService.getNotifications();
  }
}
