import {
  Controller,
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
  NotFoundException,
} from '@nestjs/common';
import { Response, query, response } from 'express';
import { OwnerGreenhousesModule } from './owner-greenhouses.module';
import { HttpCode } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { NotFoundError } from 'rxjs';
import { GoogleService } from 'src/auth/google.service';
import { OwnerGreenhousesService } from './owner-greenhouses.service';
@Controller('greenhouses')
@UseGuards(JwtAuthGuard)
export class OwnerGreenhousesController {
  constructor(
    private readonly ownerGreenhousesService: OwnerGreenhousesService,
    private readonly googleService: GoogleService
  ) {}
  @Get()
  async getGreenhouses(
    @Query('q') searchTerm: any,
    @Query('greenhouse_name') greenhouseName: any,
    @Query('greenhouse_size') greenhouseSize: any,
    @Query('greenhouse_size_measurement') greenhouseSizeMeasurement: any,
    @Query('greenhouse_description') greenhouseDescription: any,
    @Query('greenhouse_location') greenhouseLocation: any,
    @Query('created_at') date: any,
    @Query('page') page: any,
    @Query('perPage') perPage: any,
    @Query('field') field: any,
    @Query('order') order: any,
    @Request() req
  ) {
    try {
      console.log(typeof page);
      page = parseInt(page);
      perPage = parseInt(perPage);
      console.log('page::::===', page);
      console.log('perPage::::===', perPage);
      console.log('ЗАПРОС ПОЛУЧЕН!!!!!!!!!');
      console.log('searchTerm==', searchTerm);
      console.log('greenhouse_name==', greenhouseName);
      console.log('greenhouse_size==', greenhouseSize);
      console.log('greenhouse_size_measurement==', greenhouseSizeMeasurement);
      console.log('greenhouse_description==', greenhouseDescription);
      console.log('greenhouse_location==', greenhouseLocation);
      console.log('created_at==', date);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      console.log(email);
      if (
        searchTerm ||
        greenhouseName ||
        greenhouseSize ||
        greenhouseSizeMeasurement ||
        greenhouseDescription ||
        greenhouseLocation || 
        date
      ) {
        const filteredGreenhouses = await this.ownerGreenhousesService.searchGreenhouses(
          email,
          searchTerm,
          greenhouseName,
          greenhouseSize,
          greenhouseSizeMeasurement,
          greenhouseDescription,
          greenhouseLocation,
          date,
          page,
          perPage,
          field,
          order
        );
        console.log(filteredGreenhouses);
        return filteredGreenhouses;
      } else if (page && perPage) {
        console.log('aaaaa');
        const { data, total } =
          await this.ownerGreenhousesService.getGreenhousesByEmail(
            email,
            page,
            perPage,
            field,
            order
          );
        console.log('hello');
        console.log("data",data);
        return { data, total };
      }
    } catch (error) {
      throw new NotFoundException('Greenhouses not found', 'custom-error-code');
    }
  }
  @Post('create')
  async createGreenhouse(@Body() greenhouseData: any, @Request() req, @Res() res) {
    try {
      console.log("Greenhouse data: ", greenhouseData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const result = await this.ownerGreenhousesService.createGreenhouse(
        email,
        greenhouseData
      );
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'You already have a greenhouse with the same name.') {
        // Если возникла ошибка с определенным сообщением, отправляем ответ с ошибкой
        res.status(400).json({
          message: 'You already have a greenhouse with the same name.',
          status: 'error',
        });
      } else {
        res.status(500).json({
          message: 'An error occurred.',
          status: 'error',
        });
      }
    }
  }





}
