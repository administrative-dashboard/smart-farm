// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PortableDevicesController } from './owners-portable-devices.controller';
import { OwnersPortableDevicesService } from './owners-portable-devices.service';

@Module({
  imports: [],
  controllers: [PortableDevicesController],
  providers: [OwnersPortableDevicesService],
})
export class OwnerPortableDeviceModule { }
