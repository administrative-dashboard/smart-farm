//main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { config } from 'dotenv';
import { Sequelize } from 'sequelize'; // Import Sequelize
config();
async function start() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with the origin of your React Admin app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['Content-Range'],
  });
  try {
    // Create a Sequelize instance to check database connectivity
    const sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });
    // Test the database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // Start the Nest.js application
    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Exit the application with an error code
  }
}
start();