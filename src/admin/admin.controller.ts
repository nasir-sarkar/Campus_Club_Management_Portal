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

import { AdminService } from './admin.service';

import { CreateAdminDto } from './dto/create-admin.dto';

import { UpdateAdminDto } from './dto/update-admin.dto';

import { JwtGuard } from '../auth/jwt.guard';

import { RolesGuard } from '../auth/roles.guard';

import { Roles } from '../auth/roles.decorator';

import { Role } from '../auth/roles.enum';

@Controller('admins')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @Post()
    create(@Body() dto: CreateAdminDto) {
        return this.adminService.create(dto);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @Get()
    findAll() {
        return this.adminService.findAll();
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.adminService.findOne(id);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
        return this.adminService.update(id, dto);
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.SUPER_ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.adminService.remove(id);
    }
}
