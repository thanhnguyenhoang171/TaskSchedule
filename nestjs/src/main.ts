import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  const configService = app.get(ConfigService);

  // Bật global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));


  // Config CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }

  );

  const port = configService.get<string>('PORT') || 3002
  // const dbHost = configService.get<string>('database.host');
  // console.log("Check dbhost = ", dbHost);
  await app.listen(port);
}
bootstrap();
