import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
import { OwnerPortableDevice } from '../database/models/owners_portable_devices.model '; // Adjust the path
import { PortableDevicesController } from './owners-portable-devices.controller';
import { PortableDevice } from 'src/database/models/portable_devices.model ';
@Module({
  imports: [SequelizeModule.forFeature([OwnerPortableDevice, PortableDevice]),
  // RouterModule.register([
  //   {
  //     path: 'portable_devices/create',
  //     module: OwnerPortableDevice,
  //   },
  // ]
  // )
], 
  providers: [OwnersPortableDevicesService],
  controllers: [PortableDevicesController],
})
export class OwnerPortableDeviceModule {}
