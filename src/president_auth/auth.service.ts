import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PresidentService } from '../club_president/president.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly presidentService: PresidentService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.presidentService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.p_password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.p_email, id: user.p_id, role: 'president' };
    return { access_token: this.jwtService.sign(payload) };
  }
}
