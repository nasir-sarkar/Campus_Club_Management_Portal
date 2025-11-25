import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Admin } from './entities/admin.entity';

import { CreateAdminDto } from './dto/create-admin.dto';

import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async create(dto: CreateAdminDto) {
    const hashedPass = await bcrypt.hash(dto.password, 10);

    const admin = this.adminRepo.create({
      ...dto,
      password: hashedPass,
    });

    return this.adminRepo.save(admin);
  }

  findAll() {
    return this.adminRepo.find({ relations: ['clubs'] });
  }

  async findOne(id: string) {
    const admin = await this.adminRepo.findOne({
      where: { admin_id: id },
      relations: ['clubs'],
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async update(id: string, dto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(admin, dto);

    return this.adminRepo.save(admin);
  }

  async remove(id: string) {
    return this.adminRepo.delete(id);
  }
}
