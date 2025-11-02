import { Injectable, NotFoundException } from '@nestjs/common';
//new
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PatchMemberDto } from './dto/patch-member.dto';


@Injectable()
export class MemberService {
    private members=[
        {id:1,name:"Rahim",age:23,email:"rahim@example.com",phone:"0123456789",address:"Dhaka"},
        {id:2,name:"Karim",age:24,email:"karim@example.com",phone:"0123456788",address:"Chittagong"},
        {id:3,name:"Rahi",age:25,email:"rahi@example.com",phone:"0123456787",address:"Khulna"}
    ];
    //GET
    getAllMembers()
    {
        return this.members;
    }
    //GET by ID
    getMemberById(id:number)
    {
        const member=this.members.find((m)=>m.id===id)
        if(!member) throw new NotFoundException("member not found")
            return member;
    }
    //POST
    createMember(data:{name:string; age:number; email: string; phone:string; address:string})
    {
        const newMember={
            id:Date.now(), //=> unique id based on timestamp
            ...data        //=> spread operator
        };
        this.members.push(newMember);
        return newMember;
    }
    //PUT
    updateMember(id:number,data:{name: string;age: number; email: string; phone:string; address:string})
    {
        const index=this.members.findIndex((m) => m.id===id);
        if(index === -1)
            throw new NotFoundException('not found');
        this.members[index]={ id, ...data}
        return this.members[index];
    }
    //PATCH
    patchMember(id:number,data:Partial<{name:string; age:number}>) //=> Partial makes all properties optional
    {
        const member=this.getMemberById(id);
        Object.assign(member,data) //=> merges data into student object,object.assign(target,source) means copy source properties to target.
        return member;
    }
    //DELETE
    deleteMember(id: number)
    {
        const index=this.members.findIndex((m) => m.id===id);
        if(index === -1)
        throw new NotFoundException('not found');
    const deleted=this.members.splice(index,1) //splice(index,1) => removes 1 element at index and returns array of removed elements.
    return{message:'member deleted' , member: deleted[0]}
    }
    //GET - Events
    getEvents() {
    return [
      { id: 1, title: 'Hackathon', date: '2025-11-15' },
      { id: 2, title: 'Tech Talk', date: '2025-12-01' },
    ];
   }

    //GET - Notifications
    getNotifications() {
    return [
    'Class schedule updated!',
    'Registration for AI Workshop is open.',
    'New competition announced: Coding Challenge 2025.'
  ];
    
    }
}
