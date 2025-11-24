import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const admin = await this.service.validate(dto.email, dto.password);
    return this.service.login(admin);
  }
}
