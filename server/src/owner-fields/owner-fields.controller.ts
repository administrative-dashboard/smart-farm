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
import { OwnerFieldsService } from './owner-fields.service';
import { HttpCode } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { NotFoundError } from 'rxjs';
import { GoogleService } from 'src/auth/google.service';
@Controller('fields')
@UseGuards(JwtAuthGuard)
export class OwnerFieldsController {
  constructor(
    private readonly ownerFieldsService: OwnerFieldsService,
    private readonly googleService: GoogleService
  ) {}

  @Get()
  async getFields(
    @Query('q') searchTerm: any,
    @Query('field_name') fieldName: any,
    @Query('field_size') fieldSize: any,
    @Query('measurement') fieldSizeMeasurement: any,
    @Query('field_description') fieldDescription: any,
    @Query('field_location') fieldLocation: any,
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
      console.log('field_name==', fieldName);
      console.log('field_size==', fieldSize);
      console.log('field_size_measurment==', fieldSizeMeasurement);
      console.log('field_description==', fieldDescription);
      console.log('created_at==', date);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      console.log(email);
      if (
        searchTerm ||
        fieldName ||
        fieldSize ||
        fieldSizeMeasurement ||
        fieldDescription ||
        fieldLocation ||
        date
      ) {
        const filteredFields = await this.ownerFieldsService.searchFields(
          email,
          searchTerm,
          fieldName,
          fieldSize,
          fieldSizeMeasurement,
          fieldDescription,
          fieldLocation,
          date,
          page,
          perPage,
          field,
          order
        );
        return filteredFields;
      } else if (page && perPage) {
        const { data, total } =
          await this.ownerFieldsService.getFieldsByEmail(
            email,
            page,
            perPage,
            field,
            order
          );
        return { data, total };
      }
    } catch (error) {
      throw new NotFoundException('Fields not found', 'custom-error-code');
    }
  }

  @Post('create')
  async createPortableDevice(@Body() fieldData: any, @Request() req) {
    try {
      console.log("Field data: ", fieldData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      
      const result = await this.ownerFieldsService.createField(
        email,
        fieldData
      );
      return result; 
    } catch (error) {
        throw error
        .
    }
  }
}
