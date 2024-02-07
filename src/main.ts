import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }); // enable cors
  app.use(cookieParser()); // enable cookie parser
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // enable validation pipe
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
