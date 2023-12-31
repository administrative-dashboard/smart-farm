import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MeasurementUnit } from 'src/database/models/measurement_units';

@Injectable()
export class MeasurementUnitsService {
  constructor(
    @InjectModel(MeasurementUnit)
    private readonly measurementUnit: typeof MeasurementUnit
  ) { }
  async getTypesArea(): Promise<{ data: any[] }> {
    try {
      const types = await this.measurementUnit.findAll({
        where: {
          type: 'area',
        },
      });
      return { data: types };
    } catch (error) {
      console.error('Error retrieving types by area:', error);
      throw error;
    }
  }


}
