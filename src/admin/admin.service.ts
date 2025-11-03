import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class AdminService {
  private clubs = [
    { id: 1, name: 'AI Club', description: 'Artificial Intelligence Club' },
    { id: 2, name: 'Coding Club', description: 'Programming and Problem Solving' },
  ];

  private events = [
    { id: 1, title: 'Hackathon 2025', description: 'Coding event', clubId: 2 },
  ];

  // 🧱 ADMIN DASHBOARD DATA (mocked)
  getAdminDashboard() {
    return "hELLO ADMIN DASHBOARD DATA";
  }

  // 🧱 CREATE CLUB
  createClub(dto: CreateClubDto) {
    const id = this.clubs.length ? this.clubs[this.clubs.length - 1].id + 1 : 1;
    const newClub = { id, ...dto };
    this.clubs.push(newClub);
    return { message: 'Club created successfully', club: newClub };
  }

  // 🧱 UPDATE CLUB
  updateClub(id: number, dto: UpdateClubDto) {
    const index = this.clubs.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Club not found');
    this.clubs[index] = { ...this.clubs[index], ...dto };
    return { message: 'Club updated', club: this.clubs[index] };
  }

  // 🧱 DELETE CLUB
  deleteClub(id: number) {
    const index = this.clubs.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Club not found');
    this.clubs.splice(index, 1);
    return { message: 'Club deleted successfully' };
  }

  // 🧱 GET ALL CLUBS
  getAllClubs() {
    return this.clubs;
  }

  // 🧱 GET CLUB BY ID
  getClubById(id: number) {
    const club = this.clubs.find((c) => c.id === id);
    if (!club) throw new NotFoundException('Club not found');
    return club;
  }

  // 🧱 GET ALL EVENTS (mocked)
  getAllEvents() {
    return this.events.map((e) => ({
      ...e,
      club: this.clubs.find((c) => c.id === e.clubId) || null,
    }));
  }
}
