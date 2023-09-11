import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import { Community } from 'src/database/models/communities.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Community]),
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService]
})
export class CommunitiesModule {}
