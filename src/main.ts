import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // enable cors
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // enable validation pipe
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
