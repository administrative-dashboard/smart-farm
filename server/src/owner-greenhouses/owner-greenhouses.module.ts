import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnerGreenhousesController } from './owner-greenhouses.controller';
import { OwnerGreenhousesService } from './owner-greenhouses.service';
import { GoogleService } from 'src/auth/google.service';
import { Greenhouse } from 'src/database/models/greenhouses.model';
import { OwnerGreenhouse } from 'src/database/models/owners_greenhouses.model';
@Module({
  imports: [SequelizeModule.forFeature([OwnerGreenhouse, Greenhouse])],
  controllers: [OwnerGreenhousesController],
  providers: [OwnerGreenhousesService, GoogleService]
})
export class OwnerGreenhousesModule {}
