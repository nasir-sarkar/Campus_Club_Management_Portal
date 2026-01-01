import { Injectable } from '@nestjs/common';
import { RegisterAccountDto } from './dto/register-account.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FeedbackDto } from './dto/feedback.dto';

@Injectable()
export class ParticipantService {

  registerAccount(body: RegisterAccountDto, nidImage: Express.Multer.File) {
    return {
      message: 'Participant account created',
      data: body,
      nidImage: nidImage ? nidImage.filename : null
    };
  }


  login(body: LoginDto) {
    return { message: 'Login successful', token: 'sample-jwt-token' };
  }

  getProfile() {
    return { name: 'John Doe', email: 'john@example.com', role: 'participant' };
  }

  updateProfile(userId: string, body: UpdateProfileDto) {
    return { message: `Profile for user ${userId} updated`, data: body };
  }

  getAllEvents() {
    return 'List of all events across clubs';
  }

  getEventById(id: string) {
    return `Details of event ${id}`;
  }

  registerForEvent(eventId: string) {
    return `Registered for event ${eventId}`;
  }

  getStatus(eventId: string) {
    return `Status for event ${eventId}`;
  }

  getMyEvents() {
    return 'List of registered events';
  }

  cancelParticipation(eventId: string) {
    return `Cancelled participation for event ${eventId}`;
  }

  submitFeedback(eventId: string, body: FeedbackDto) {
    return {
      message: `Feedback for event ${eventId} received from person ${body.personId}`,
      data: body
    };
  }
}
