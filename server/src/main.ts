import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import { execSync } from 'child_process'; 

config();

try {
  execSync('node src/database/migrations/index.js');
  console.log('Migrations executed successfully');
} catch (error) {
  console.error('Error during migrations:', error);
}

try {
  execSync('node src/database/seeders/index.js');
  console.log('Seeds executed successfully');
} catch (error) {
  console.error('Error during seeding:', error);
}
async function start() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    // origin: '*',
    origin: `${process.env.CLIENT_URL}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['Content-Range'],
  });
  await app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
start();