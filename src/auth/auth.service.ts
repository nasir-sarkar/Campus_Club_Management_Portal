import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';

import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,

    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });

    if (!admin) throw new UnauthorizedException('Invalid Credentials');

    const match = await bcrypt.compare(password, admin.password);

    if (!match) throw new UnauthorizedException('Invalid Credentials');

    return admin;
  }

  async login(admin: Admin) {
    const payload = {
      sub: admin.admin_id,
      email: admin.email,
      role: admin.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
