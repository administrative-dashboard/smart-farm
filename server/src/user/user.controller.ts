import { Controller, Get, Request, UseGuards, NotFoundException, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info/:userId')
  async getUserInfo(@Param('userId') userId: number) {
    const userInfo = await this.userService.getUserInfoById(userId);
    return userInfo;
  }
}

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Get('info')
//   // @UseGuards(AuthGuard('jwt')) 
//   async getUserInfo(@Request() req) {
//     const userId = req.user.id; 
//     const userInfo = await this.userService.getUserInfo(1); 
//     if (!userInfo) {
//       throw new NotFoundException('User profile not found');
//     }
//     return userInfo;
//   }
// }
