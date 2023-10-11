import { Module } from '@nestjs/common';
import { MeasurementUnitsController } from './measurement-units.controller';
import { MeasurementUnitsService } from './measurement-units.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MeasurementUnit } from 'src/database/models/measurement_units';

@Module({
  imports: [SequelizeModule.forFeature([MeasurementUnit]),
],
  controllers: [MeasurementUnitsController],
  providers: [MeasurementUnitsService]
})
export class MeasurementUnitsModule {}
