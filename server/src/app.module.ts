//app.module.ts
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './database/models/users.model';
import { UserCommunity } from './database/models/users_communities.model';
import { Permission } from './database/models/permissions.model';
import { Role } from './database/models/roles.model';
import { RolePermission } from './database/models/roles_perms.model';
import { UserRole } from './database/models/users_roles';
import { DeviceRequestHistory } from './database/models/device_requests_history.model';
import { Field } from './database/models/fields.model';
import { FixedDevice } from './database/models/fixed_devices.model';
import { Greenhouse } from './database/models/greenhouses.model';
import { MeasurementUnit } from './database/models/measurement_units';
import { OwnerField } from './database/models/owners_fields.model';
import { OwnerGreenhouse } from './database/models/owners_greenhouses.model';
import { OwnerFixedDevice } from './database/models/owners_fixed_devices.model';
import { OwnerPortableDevice } from './database/models/owners_portable_devices.model ';
import { PortableDevice } from './database/models/portable_devices.model ';
import { Community } from './database/models/communities.model';
import { ScheduleDevice } from './database/models/schedules_devices.model';
import { AuthModule } from './auth/auth.module';
import { DeviceUsageStatisticsCommunities } from './database/models/device_usage_statistics_communities.model';
import { DeviceUsageStatisticsFields } from './database/models/device_usage_statistics_fields.model';
import { DeviceUsageStatisticsGreenhouses } from './database/models/device_usage_statistics_greenhouses.model';
import { PortableDevicesController } from './owner-portable-devices/owners-portable-devices.controller';
import { OwnersPortableDevicesService } from './owner-portable-devices/owners-portable-devices.service';
import { OwnerPortableDeviceModule } from './owner-portable-devices/owner-portable-devices.module';
import { UserModule } from './user/user.module';
import { CommunitiesModule } from './communities/communities.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { UserController } from './user/user.controller';
import { OwnerFixedDeviceModule } from './owner-fixed-devices/owner-fixed-devices.module';
import { OwnerFieldsModule } from './owner-fields/owner-fields.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      models: [
        User,
        Community,
        UserCommunity,
        Permission,
        Role,
        RolePermission,
        UserRole,
        DeviceRequestHistory,
        Field,
        FixedDevice,
        Greenhouse,
        MeasurementUnit,
        OwnerField,
        OwnerGreenhouse,
        PortableDevice,
        DeviceRequestHistory,
        ScheduleDevice,
        DeviceUsageStatisticsCommunities,
        DeviceUsageStatisticsFields,
        DeviceUsageStatisticsGreenhouses,
        OwnerFixedDevice,
        OwnerPortableDevice
      ],
    }),
    AuthModule,
    OwnerPortableDeviceModule,
    UserModule,
    CommunitiesModule,
    OwnerFixedDeviceModule,
    OwnerFieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('*'); 
//   }
// }
/* @Module({
  imports: [],
  controllers: [FixedDevicesController], // Include the controller here
  providers: [],
}) */

export class AppModule {}