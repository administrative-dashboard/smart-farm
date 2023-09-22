import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { OwnersFixedDevicesService } from './owner-fixed-devices.service';
import { OwnerFixedDevice } from 'src/database/models/owners_fixed_devices.model';
import { FixedDevicesController } from './owner-fixed-devices.controller';
import { FixedDevice } from 'src/database/models/fixed_devices.model';
import { GoogleService } from 'src/auth/google.service';
@Module({
  imports: [SequelizeModule.forFeature([OwnerFixedDevice, FixedDevice]),
], 
  providers: [
    OwnersFixedDevicesService,
    GoogleService,],
  controllers: [FixedDevicesController],
})
export class OwnerFixedDeviceModule {}