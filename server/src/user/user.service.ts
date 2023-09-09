// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/models/users.model';
@Injectable()
export class UserService {
  // Ваша логика для получения информации о пользователе

  constructor(private readonly jwtService: JwtService) {}

  async getUserInfo(jwtToken: string) {
    try {
      const payload = this.jwtService.verify(jwtToken);
      // Assuming you have a UserService to retrieve user information
      const user = User.findOne({ where: { id: payload.user_id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('Invalid token');
    }
  }
}