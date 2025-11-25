
import { Controller, Get, Post, Delete, Patch, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { ParticipantService } from './participant.service';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FeedbackDto } from './dto/feedback.dto';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) { }

  @Post('register-account')
  @UseInterceptors(FileInterceptor('nidImage', {
    storage: diskStorage({
      destination: './uploads/nid',
      filename: (req, file, cb) => {

        cb(null, Date.now() + file.originalname);
      }
    }),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
        cb(null, true);
      else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    }
  }))
  registerAccount(
    @Body() body: RegisterAccountDto,
    @UploadedFile() nidImage: Express.Multer.File
  ) {
    return this.participantService.registerAccount(body, nidImage);
  }


  @Post('login')
  login(@Body() body: LoginDto) {
    return this.participantService.login(body);
  }


  @Get('profile')
  getProfile() {
    return this.participantService.getProfile();
  }


  @Patch('profile/update/:userId')
  updateProfile(@Param('userId') userId: string, @Body() body: UpdateProfileDto) {
    return this.participantService.updateProfile(userId, body);
  }


  @Get('events')
  getAllEvents() {
    return this.participantService.getAllEvents();
  }


  @Get('event/:id')
  getEventById(@Param('id') id: string) {
    return this.participantService.getEventById(id);
  }

  @Post('register/:eventId')
  registerForEvent(@Param('eventId') eventId: string) {
    return this.participantService.registerForEvent(eventId);
  }


  @Get('status/:eventId')
  getStatus(@Param('eventId') eventId: string) {
    return this.participantService.getStatus(eventId);
  }


  @Get('my-events')
  getMyEvents() {
    return this.participantService.getMyEvents();
  }


  @Delete('cancel/:eventId')
  cancelParticipation(@Param('eventId') eventId: string) {
    return this.participantService.cancelParticipation(eventId);
  }

  @Post('feedback/:eventId')
  submitFeedback(@Param('eventId') eventId: string, @Body() body: FeedbackDto) {
    return this.participantService.submitFeedback(eventId, body);
  }
}




