//app.module.ts
import { Module } from '@nestjs/common';
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
import { OwnerPortableDeviceModule } from './owner-portable-devices/owner-portable-devices.module';
import { UserModule } from './user/user.module';
import { CommunitiesModule } from './communities/communities.module';
import { OwnerFixedDeviceModule } from './owner-fixed-devices/owner-fixed-devices.module';
import { UserPermission } from './database/models/users_permissions.model';
import { OwnerFieldsModule } from './owner-fields/owner-fields.module';
import { MeasurementUnitsModule } from './measurement-units/measurement-units.module';
import { OwnerGreenhousesModule } from './owner-greenhouses/owner-greenhouses.module';
import { OwnerProductModule } from './owner-products/products.module';
import { OwnerProduct } from './database/models/owners_products.model'
import { Product } from './database/models/product.model';
import { ProductType } from './database/models/product_types.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
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
        ScheduleDevice,
        DeviceUsageStatisticsCommunities,
        DeviceUsageStatisticsFields,
        DeviceUsageStatisticsGreenhouses,
        OwnerFixedDevice,
        OwnerPortableDevice,
        UserPermission,
        Product,
        ProductType,
        OwnerProduct
      ],
      autoLoadModels: true
    }),
    AuthModule,
    OwnerPortableDeviceModule,
    UserModule,
    CommunitiesModule,
    OwnerFixedDeviceModule,
    OwnerFieldsModule,
    MeasurementUnitsModule,
    OwnerGreenhousesModule,
    OwnerProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }