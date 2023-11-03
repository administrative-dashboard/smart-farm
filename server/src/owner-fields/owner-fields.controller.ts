import {
  Controller,
  Get,
  Put,
  Request,
  Delete,
  Res,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { OwnerFieldsService } from './owner-fields.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GoogleService } from 'src/auth/google.service';
import { RolesPermsGuard } from 'src/auth/guards/roles_perms.guard';
import { RolesPerms } from 'src/auth/guards/roles_perms.decorator';
@Controller('fields')
@UseGuards(JwtAuthGuard, RolesPermsGuard)
@RolesPerms('OWNER', 'EDIT_FIELD')
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
    @Query('field_size_measurement') fieldSizeMeasurement: any,
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
      console.log('searchTerm==', typeof searchTerm);
      console.log('field_name==', fieldName);
      console.log('field_size==', fieldSize);
      console.log('field_size_measurement==', fieldSizeMeasurement);
      console.log('field_description==', fieldDescription);
      console.log('field_location==', fieldLocation);
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
        console.log(filteredFields);
        return filteredFields;
      } else if (page && perPage) {
        const { data, total } = await this.ownerFieldsService.getFieldsByEmail(
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

  @Get(':id')
  async getFieldById(@Param('id') id: string) {
    try {
      const field = await this.ownerFieldsService.getFieldById(id);
      console.log(field);
      if (!field) {
        return { message: 'Field not found' };
      }
      return field;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Put(':id')
  async updateFieldById(
    @Request() req,
    @Param('id') id: string,
    @Body() fieldData: any,
    @Res() res
  ) {
    try {
      console.log('Field data: ', fieldData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      console.log(fieldData);
      const updatedField = await this.ownerFieldsService.updateFieldById(
        id,
        fieldData,
        email
      );

      if (!updatedField) {
        return { message: 'Field not found' };
      }
      res.status(200).json(updatedField);
    } catch (error) {
      if (error.message === 'You already have a field with the same name.') {
        res.status(400).json({
          message: 'You already have a field with the same name.',
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

  @Post('create')
  async createField(@Body() fieldData: any, @Request() req, @Res() res) {
    try {
      console.log('Field data: ', fieldData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const result = await this.ownerFieldsService.createField(
        email,
        fieldData
      );
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'You already have a field with the same name.') {
        res.status(400).json({
          message: 'You already have a field with the same name.',
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

  @Delete(':id')
  async deleteFieldDeviceById(@Param('id') id: string) {
    try {
      const deleted = await this.ownerFieldsService.deleteFieldById(id);

      if (!deleted) {
        return { message: 'Field not found' };
      }
      return { message: 'Field deleted successfully' };
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }
}
