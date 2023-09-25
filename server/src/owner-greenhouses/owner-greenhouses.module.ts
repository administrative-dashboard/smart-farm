import { Module } from '@nestjs/common';
import { OwnerGreenhousesController } from './owner-greenhouses.controller';
import { OwnerGreenhousesService } from './owner-greenhouses.service';

@Module({
  controllers: [OwnerGreenhousesController],
  providers: [OwnerGreenhousesService]
})
export class OwnerGreenhousesModule {}
