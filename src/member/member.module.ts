import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberEntity } from '../member/entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
