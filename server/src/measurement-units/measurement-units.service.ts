import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inject } from '@nestjs/common';
import { Model } from 'sequelize';
import { ValidationTypes } from 'class-validator';
import { MeasurementUnit } from 'src/database/models/measurement_units';

@Injectable()
export class MeasurementUnitsService {
    constructor(
        @InjectModel(MeasurementUnit)
        private readonly measurementUnit: typeof MeasurementUnit
      ) {}
    async getTypes(): Promise<{ data: any[]}> {
        try {
            const types = await this.measurementUnit.findAll({
                where: {
                    type: 'area'
                }
            })
            return {data: types};
        } catch (error) {

        }
    }
}
