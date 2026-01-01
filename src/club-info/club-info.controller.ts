import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { ClubInfoService } from './club-info.service';

import { CreateClubInfoDto } from './dto/create-club-info.dto';

import { UpdateClubInfoDto } from './dto/update-club-info.dto';

import { JwtGuard } from '../auth/jwt.guard';

import { RolesGuard } from '../auth/roles.guard';

import { Roles } from '../auth/roles.decorator';

import { Role } from '../auth/roles.enum';

@UseGuards(JwtGuard, RolesGuard)
@Controller('clubs')
export class ClubInfoController {
  constructor(private clubService: ClubInfoService) {}

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Post()
  create(@Body() dto: CreateClubInfoDto) {
    return this.clubService.create(dto);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get()
  findAll() {
    return this.clubService.findAll();
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClubInfoDto) {
    return this.clubService.update(id, dto);
  }

  @Roles(Role.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubService.remove(id);
  }
}
