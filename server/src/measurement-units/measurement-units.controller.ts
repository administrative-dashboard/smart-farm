import { Controller } from '@nestjs/common';
import { MeasurementUnitsService } from './measurement-units.service';
import { Get } from '@nestjs/common';
@Controller('measurement_units')
export class MeasurementUnitsController {
    constructor(
        private readonly measurementUnits: MeasurementUnitsService,
      ) {}
      @Get('fields') 
        async getTypeAreas() {
            try {
                const types = await this.measurementUnits.getTypes();
                return types.data;
            } catch(error) {
                throw error;
            }
            
        }

}

