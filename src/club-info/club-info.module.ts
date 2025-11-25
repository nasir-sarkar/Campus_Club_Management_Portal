import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubInfo } from 'src/club-info/entitites/club-info.entity';
import { ClubInfoService } from './club-info.service';
import { ClubInfoController } from './club-info.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ClubInfo])],
    providers: [ClubInfoService],
    controllers: [ClubInfoController],
})
export class ClubInfoModule { }
