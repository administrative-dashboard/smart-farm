import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

export const createSwagger = async () => {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  //   const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api', app, document);

  await app.listen(7000);
};

createSwagger();
