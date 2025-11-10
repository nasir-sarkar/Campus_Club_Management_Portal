import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PresidentModule } from './club_president/president.module';
import { ParticipantModule } from './event_participant/participant.module';

@Module({
  imports: [PresidentModule, ParticipantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
