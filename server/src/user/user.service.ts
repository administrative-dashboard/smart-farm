// user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from 'src/database/models/users.model';
@Injectable()
export class UserService {
  // Ваша логика для получения информации о пользователе
  async getUserInfo(user_id: string) {
    // Здесь можно выполнить запрос к базе данных или другую логику для получения информации о пользователе
    // Пример:
    const user = await User.findOne({ where: { id: user_id } });
    return user;
  }
}