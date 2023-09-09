// user.controller.ts
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service'; // Создайте сервис для работы с пользователями

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @UseGuards(AuthGuard('jwt')) 
  async getUserInfo(@Request() req) {
    const userId = req.user.id; 
    const userInfo = await this.userService.getUserInfo(userId); 
    return userInfo;
  }
}