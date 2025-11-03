import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PresidentModule } from './Club_Presidentt/president.module';

@Module({
  imports: [PresidentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
