import { Controller,
    Get,
    Put,
    Request,
    Delete,
    Res,
    Post,
    Body,
    Logger,
    Param,
    Query,
    UseGuards,
    NotFoundException, } from '@nestjs/common';
import { MeasurementUnitsService } from './measurement-units.service';
import { Response, query, response } from 'express';
import { HttpCode } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { NotFoundError } from 'rxjs';
import { GoogleService } from 'src/auth/google.service';
@Controller('measurement_units')

export class MeasurementUnitsController {
    constructor(
        private readonly measurementUnitsService: MeasurementUnitsService,
      ) {}
      @Get('/fields')
      async getFields() {
        try {
          const types = await this.measurementUnitsService.getTypesArea()
          return types.data
        } catch (error) {
          throw new NotFoundException('Types not found', 'custom-error-code');
        }
      }


}

