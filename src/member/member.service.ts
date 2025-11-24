import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PatchMemberDto } from './dto/patch-member.dto';

@Injectable()
export class MemberService {
  private members = [
    { id: 1, name: "Rahim", age: 23, email: "rahim@example.com", phone: "0123456789", address: "Dhaka", password: "Rahim@123" },
    { id: 2, name: "Karim", age: 24, email: "karim@example.com", phone: "0123456788", address: "Chittagong", password: "Karim#123" },
    { id: 3, name: "Rahi", age: 25, email: "rahi@example.com", phone: "0123456787", address: "Khulna", password: "Rahi$123" }
  ];

  // GET all members
  getAllMembers() {
    return this.members;
  }

  // GET by ID
  getMemberById(id: number) {
    const member = this.members.find(m => m.id === id);
    if (!member) throw new NotFoundException("Member not found");
    return member;
  }

  // POST
  createMember(data: CreateMemberDto) {
    const newMember = {
      id: Date.now(),
      ...data
    };
    this.members.push(newMember);
    return newMember;
  }

  // PUT
  updateMember(id: number, data: UpdateMemberDto) {
    const index = this.members.findIndex(m => m.id === id);
    if (index === -1) throw new NotFoundException('Member not found');
    this.members[index] = { id, ...data };
    return this.members[index];
  }

  // PATCH
  // patchMember(id: number, data: Partial<CreateMemberDto>) {
  //   const member = this.getMemberById(id);
  //   Object.assign(member, data);
  //   return member;
  // }

//   patchMember(id: number, data: PatchMemberDto) {
//   const member = this.members.find(m => m.id === id);
//   if (!member) {
//     throw new NotFoundException('Member not found');
//   }
//   return {
//     message: `Member updated successfully! ID: ${id}`,
//     updatedFields: data,
//   };
//  }

patchMember(id: number, data: PatchMemberDto) {
  const member = this.members.find((m) => m.id === id);
  if (!member) {
    throw new NotFoundException('Member not found');
  }

  if (data.name !== undefined) member.name = data.name;
  if (data.age !== undefined) member.age = data.age;

  return {
    message: `Member updated successfully! ID: ${id}`,
    updatedFields: { name: member.name, age: member.age },
  };
}



  // DELETE
  deleteMember(id: number) {
    const index = this.members.findIndex(m => m.id === id);
    if (index === -1) throw new NotFoundException('Member not found');
    const deleted = this.members.splice(index, 1);
    return { message: 'Member deleted', member: deleted[0] };
  }

  // GET Events
  getEvents() {
    return [
      { id: 1, title: 'Hackathon', date: '2025-11-15' },
      { id: 2, title: 'Tech Talk', date: '2025-12-01' },
    ];
  }

  // GET Notifications
  getNotifications() {
    return [
      'Class schedule updated!',
      'Registration for AI Workshop is open.',
      'New competition announced: Coding Challenge 2025.'
    ];
  }
}
