import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //Transforma los datos a su tipo de dato correspondiente (ej: un string a un numero)
      transformOptions: { enableImplicitConversion: true }, //Habilita la conversion implicita de los datos (ej: un string a un numero)
    }),
  );
  app.setGlobalPrefix('/api/v2'); //Aqui se define el prefijo de la api
  await app.listen(process.env.PORT);
}
bootstrap();
