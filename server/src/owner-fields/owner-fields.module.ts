import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnerFieldsController } from './owner-fields.controller';
import { OwnerFieldsService } from './owner-fields.service';
import { GoogleService } from 'src/auth/google.service';
import { Field } from 'src/database/models/fields.model';
import { OwnerField } from 'src/database/models/owners_fields.model';
@Module({
  imports: [SequelizeModule.forFeature([OwnerField, Field])],
  controllers: [OwnerFieldsController],
  providers: [OwnerFieldsService, GoogleService],
})
export class OwnerFieldsModule {}