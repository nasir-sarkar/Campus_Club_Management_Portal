import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ClubInfo } from 'src/club-info/entitites/club-info.entity';

import { CreateClubInfoDto } from './dto/create-club-info.dto';

import { UpdateClubInfoDto } from './dto/update-club-info.dto';

@Injectable()
export class ClubInfoService {
  constructor(
    @InjectRepository(ClubInfo)
    private clubRepo: Repository<ClubInfo>,
  ) { }

  create(dto: CreateClubInfoDto) {
    const club = this.clubRepo.create(dto);
    return this.clubRepo.save(club);
  }

  findAll() {
    return this.clubRepo.find({ relations: ['admin'] });
  }

  async findOne(id: string) {
    const club = await this.clubRepo.findOne({
      where: { club_id: id },
      relations: ['admin'],
    });

    if (!club) {
      throw new NotFoundException('Club not found');
    }

    return club;
  }

  async update(id: string, dto: UpdateClubInfoDto) {
    const club = await this.findOne(id);
    Object.assign(club, dto);
    return this.clubRepo.save(club);
  }

  async remove(id: string) {
    return this.clubRepo.delete(id);
  }
}
