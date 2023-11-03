import {
  Controller,
  Get,
  Put,
  Request,
  Res,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GoogleService } from 'src/auth/google.service';
import { OwnerGreenhousesService } from './owner-greenhouses.service';
import { RolesPermsGuard } from 'src/auth/guards/roles_perms.guard';
import { RolesPerms } from 'src/auth/guards/roles_perms.decorator';
@Controller('greenhouses')
@UseGuards(JwtAuthGuard, RolesPermsGuard)
@RolesPerms('OWNER', 'EDIT_GREENHOUSE')
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
        const filteredGreenhouses =
          await this.ownerGreenhousesService.searchGreenhouses(
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
        console.log('data', data);
        return { data, total };
      }
    } catch (error) {
      throw new NotFoundException('Greenhouses not found', 'custom-error-code');
    }
  }
  @Get(':id')
  async getFieldById(@Param('id') id: string) {
    try {
      const greenhouse =
        await this.ownerGreenhousesService.getGreenhouseById(id);
      console.log(greenhouse);
      if (!greenhouse) {
        return { message: 'Field not found' };
      }
      return greenhouse;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }

  @Put(':id')
  async updateGreenhouseById(
    @Request() req,
    @Param('id') id: string,
    @Body() greenhouseData: any,
    @Res() res
  ) {
    try {
      console.log('Greenhouse data: ', greenhouseData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      console.log(greenhouseData);
      const updatedGreenhouse =
        await this.ownerGreenhousesService.updateGreenhouseById(
          id,
          greenhouseData,
          email
        );

      if (!updatedGreenhouse) {
        return { message: 'Field not found' };
      }
      res.status(200).json(updatedGreenhouse);
    } catch (error) {
      if (
        error.message === 'You already have a greenhouse with the same name.'
      ) {
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

  @Post('create')
  async createGreenhouse(
    @Body() greenhouseData: any,
    @Request() req,
    @Res() res
  ) {
    try {
      console.log('Greenhouse data: ', greenhouseData);
      const accessToken = req.user.accessToken;
      const email = await this.googleService.getUserInfo(accessToken);
      const result = await this.ownerGreenhousesService.createGreenhouse(
        email,
        greenhouseData
      );
      res.status(200).json(result);
    } catch (error) {
      if (
        error.message === 'You already have a greenhouse with the same name.'
      ) {
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
