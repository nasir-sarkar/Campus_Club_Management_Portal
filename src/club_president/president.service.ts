import { Injectable } from '@nestjs/common';
import { MemberDto } from './dto/member.dto';
import { ClubDto } from './dto/club.dto';
import { EventDto } from './dto/event.dto';

@Injectable()
export class PresidentService {


  addMember(member: MemberDto) {
    const { memberName, memberUsername, memberId, memberPassword, memberRole, memberDOB,memberPhone } = member;
    console.log(member.memberName);
    
    return `Member Added Successfully! Name: ${memberName}, Username: ${memberUsername}, 
    ID: ${memberId}, Password: ${memberPassword}, Role: ${memberRole}, DOB: ${memberDOB}, Phone: ${memberPhone}`;
  }


  deleteMember(memberId: string) {
    return `Member with ID-${memberId} Deleted Successfully!`;
  }


  createEvent(event: EventDto) {
    const { eventId, eventName, eventCategory, eventDate } = event;
    return `Event created Successfully! ID: ${eventId}, Name: ${eventName}, Category: ${eventCategory}, Date: ${eventDate}`;
  }


  updateEvent(eventId: string, event: EventDto) {
    const { eventName, eventCategory, eventDate } = event;
    return `Event updated Successfully! Updated ID: ${eventId}, Name: ${eventName}, Category: ${eventCategory}, Date: ${eventDate}`;
  }


  deleteEvent(eventId: string) {
    return `Event deleted Successfully! ID: ${eventId}`;
  }


  updateClub(clubId: string, data: ClubDto) {
    const { clubName, clubReport } = data;
    return `Club updated Successfully! Updated ID: ${clubId}, Name: ${clubName}, Report: ${clubReport}`;
  }


  changeMemberRole(memberId: string, memberRole: string) {
    return `Member role updated! ID: ${memberId}, New Role: ${memberRole}`;
  }


  getAllMembers() {
    return [
      { memberName: 'Nasir Sarkar', MemberUsername: 'nasir12', memberId: '22-48370-3', memberRole: 'Member' },
      { memberName: 'Wahid Khan', memberUsername: 'wahid12', memberId: '22-48375-3', memberRole: 'Volunteer' },
    ];
  }


  getAllEvents() {
    return [
      { eventId: 'E001', eventName: 'Science Fair', eventcategory: 'Science', eventDate: '15-12-2025' },
      { eventId: 'E003', eventName: 'Music Festival', eventcategory: 'Music', eventDate: '28-12-2025' },
    ];
  }

}
