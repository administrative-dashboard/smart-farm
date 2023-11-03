///communities.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Community } from 'src/database/models/communities.model';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectModel(Community)
    private readonly communityModel: typeof Community
  ) {}

  async getAllCommunities() {
    return await this.communityModel.findAll();
  }
}
