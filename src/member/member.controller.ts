import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { MemberService } from './member.service';
//new
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PatchMemberDto } from './dto/patch-member.dto';


@Controller('member')
export class MemberController {
    constructor(private readonly memberService:MemberService){};
    @Get()
    getAll()
    {
        return this.memberService.getAllMembers()
    }

    @Get(':id')
    getOne(@Param('id') id:string)
    {
        return this.memberService.getMemberById(Number(id))
    }

    // @Post()
    // create(@Body()body:{name:string; age:number; email: string; phone:string; address:string})
    // {
    //     return this.studentService.createStudent(body)
    // }
    //new
    @Post()
    create(@Body() body: CreateMemberDto) {
    return this.memberService.createMember(body);
    }

    // @Put(':id')
    // update(@Param('id') id:string,@Body() body:{name:string; age:number; email: string; phone:string; address:string})
    // {
    //     return this.studentService.updateStudent(Number(id),body)
    // }
    //new
    @Put(':id')
    update(@Param('id') id: string, @Body() body: UpdateMemberDto) {
    return this.memberService.updateMember(Number(id), body);
    }

    // @Patch(':id')
    // patch(@Param('id') id:string,@Body() body:Partial<{name:string;age:number}>)
    // {
    //     return this.studentService.patchStudent(Number(id),body)
    // }
    //new
    @Patch(':id')
    patch(@Param('id') id: string, @Body() body: PatchMemberDto) {
    return this.memberService.patchMember(Number(id), body);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.memberService.deleteMember(Number(id));
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
