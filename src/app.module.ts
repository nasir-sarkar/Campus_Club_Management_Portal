import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PresidentModule } from './club_president/president.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [PresidentModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
