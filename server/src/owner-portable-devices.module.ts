import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';
import { OwnerPortableDevice } from './database/models/owners_portable_devices.model '; // Adjust the path
import { PortableDevicesController } from './owners-portable-devices.controller';
@Module({
  imports: [SequelizeModule.forFeature([OwnerPortableDevice])], 
  providers: [OwnersPortableDevicesService],
  controllers: [PortableDevicesController],
})
export class OwnerPortableDeviceModule {}
