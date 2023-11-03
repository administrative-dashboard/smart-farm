import { Controller, Get, NotFoundException } from '@nestjs/common';
import { MeasurementUnitsService } from './measurement-units.service';

@Controller('measurement_units')
export class MeasurementUnitsController {
  constructor(
    private readonly measurementUnitsService: MeasurementUnitsService
  ) {}
  @Get('/fields')
  async getFields() {
    try {
      const types = await this.measurementUnitsService.getTypesArea();
      return types.data;
    } catch (error) {
      throw new NotFoundException('Types not found', 'custom-error-code');
    }
  }
}
