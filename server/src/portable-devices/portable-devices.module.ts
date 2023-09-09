import { Module } from '@nestjs/common';
import { PortableDevicesController } from './portable-devices.controller';
import { PortableDevicesService } from './portable-devices.service';
import { PortableDevice } from 'src/database/models/portable_devices.model ';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([PortableDevice])],
  controllers: [PortableDevicesController],
  providers: [PortableDevicesService]
})
export class PortableDevicesModule {}
