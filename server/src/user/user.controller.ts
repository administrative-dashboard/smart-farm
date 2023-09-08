// user.controller.ts
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service'; // Создайте сервис для работы с пользователями

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @UseGuards(AuthGuard('jwt')) // Используйте AuthGuard для проверки JWT-токена
  async getUserInfo(@Request() req) {
    // В этой функции можно получить информацию о пользователе из JWT-токена
    const userId = req.user.id; // Пример: получение идентификатора пользователя из токена
    const userInfo = await this.userService.getUserInfo(userId); // Замените на свой метод получения информации о пользователе
    return userInfo;
  }
}