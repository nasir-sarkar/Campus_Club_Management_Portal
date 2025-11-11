import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // remove properties that not in the DTO.
    forbidNonWhitelisted: true,  // throw error if unknown fields are present.
    transform: true,  
  }));
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
