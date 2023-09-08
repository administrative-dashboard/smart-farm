// user-info.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-info')
export class UserInfoController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('jwt')) // Assuming you have a JWT strategy
  async getUserInfo(@Req() req) {
    const user = req.user; // User object should be available in the request due to the JWT strategy
    const { name, email, profile_image } = user; // Assuming your user object has relevant properties

    return { name, email, profile_image };
  }
}
