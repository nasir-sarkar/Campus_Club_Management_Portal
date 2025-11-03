import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('admin-dashboard')
    getAdminDashboard() {
    return this.adminService.getAdminDashboard();
  }

  @Post('create-club')
  createClub(@Body() dto: CreateClubDto) {
    return this.adminService.createClub(dto);
  }

  @Patch('update-club/:id')
  updateClub(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClubDto,
  ) {
    return this.adminService.updateClub(id, dto);
  }

  @Delete('delete-club/:id')
  deleteClub(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteClub(id);
  }

  @Get('clubs')
  getAllClubs() {
    return this.adminService.getAllClubs();
  }

  @Get('club/:id')
  getClubById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getClubById(id);
  }

  @Get('events')
  getAllEvents() {
    return this.adminService.getAllEvents();
  }
}
