import { Controller, Get, Put,Request,Delete, Res, Post, Body, Logger,Param,Query,UseGuards } from '@nestjs/common'; // Import Logger
import { Response, query, response } from 'express';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
import { HttpCode } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
@Controller('portable_devices')
export class PortableDevicesController {
  constructor(
    private readonly ownersPortableDevicesService: OwnersPortableDevicesService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPortableDevices(@Request() req) {
    
    try {
      console.log("ЗАПРОС ПОЛУЧЕН");
      
      const userId = req.user.user_id;
      console.log(userId);
        // Handle the case where JSON parsing fails
        
    
      
      // Use userData to customize your query or logic
      // For example, you can access userData.user_id
      // Fetch the portable devices data for the user using userData
      const portableDevices = await this.ownersPortableDevicesService.getDevicesByUserId(userId);

      // Calculate the total number of items (if available)
      const totalItems = portableDevices.length;
      
      // Set the Content-Range header
      
        
      // Send the JSON response with the retrieved data
      return portableDevices;
    } catch (error) {
      
      // Handle any errors, e.g., return an error response
      return error;
    }

  }
 
  @Get(':id')
  async getPortableDeviceById(@Param('id') id: string) {
    try {
      /* const userIdFromToken = 1; */

      // Call the service to get the portable device by ID
      const portableDevice = await this.ownersPortableDevicesService.getPortableDeviceById(
        id
        
      );

      if (!portableDevice) {
        return { message: 'Portable device not found' };
      }

      return portableDevice;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  } 
  
  @Put(':id')
  async updatePortableDeviceById(
    @Param('id') id: string,
    @Body() deviceData: any,
  ) {
    try {
    

      // Call the service to update the portable device by ID
      const updatedPortableDevice = await this.ownersPortableDevicesService.updatePortableDeviceById(
        id,
        deviceData,
      );

      if (!updatedPortableDevice) {
        return { message: 'Portable device not found' };
      }

      return updatedPortableDevice;
    } catch (error) {
      console.log(error);
      return { error: 'An error occurred' };
    }
  }


  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createPortableDevice(@Body() deviceData: any,@Request() req) {
    try {
      console.log(deviceData);
      const userId = req.user.user_id;

      // Call the service to create the portable device
      return await this.ownersPortableDevicesService.createDevice(userId, deviceData);
    } catch (error) {
      console.log(error);
    }
  }
 

  @Delete(':id')
  async deletePortableDeviceById(@Param('id') id: string) {
    try {
      // Call the service method to delete the portable device by ID
      const deleted = await this.ownersPortableDevicesService.deletePortableDeviceById(id);

      if (!deleted) {
        return { message: 'Portable device not found' };
      }

      return { message: 'Portable device deleted successfully' };
    } catch (error) {
      // Handle any errors, e.g., return an error response
      console.log(error);
      return { error: 'An error occurred' };
    }
  }
}


