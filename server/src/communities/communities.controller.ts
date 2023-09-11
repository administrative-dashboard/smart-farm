import { Controller, Get } from '@nestjs/common';
import { CommunitiesService } from './communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get('info')
  async getCommunityInfo() {
    return await this.communitiesService.getAllCommunities();
  }
}
