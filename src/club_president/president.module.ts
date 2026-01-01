import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { PresidentController } from './president.controller';
import { PresidentService } from './president.service';
import { PresidentEntity } from './entities/president.entity';
import { EventsEntity } from '../events/entities/events.entity';
import { MemberEntity } from '../member/entities/member.entity';
import { PresidentProfileEntity } from './entities/president_profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PresidentEntity, EventsEntity, MemberEntity, PresidentProfileEntity,]),
  
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: '#######',
          pass: '#######', 
        },
      },
    }),
  ],

  controllers: [PresidentController],
  providers: [PresidentService],
  exports: [PresidentService],
})
export class PresidentModule {}
