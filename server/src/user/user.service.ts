// user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/database/models/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) 
    private readonly userModel: typeof User,
  ) {}

  async getUserInfoByEmail(email: string) {
    try {
      const userInfo = await this.userModel.findOne({ where: { email } });
      return userInfo;
    } catch (error) {
      throw error;
    }
  }

  async getUserInfoById(id: number) {
    try {
      const userInfo = await this.userModel.findOne({ where: { id } });
      return userInfo;
    } catch (error) {
      throw error;
    }
  }
}

// @Injectable()
// export class UserService {
//   constructor(private readonly jwtService: JwtService) {}

  // async getUserInfo(jwtToken: string) {
  //   try {
  //     const payload = this.jwtService.verify(jwtToken);
  //     const user = await User.findOne({ where: { id: payload.user_id } });
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }
  //     return user;
  //   } catch (error) {
  //     throw new NotFoundException('Invalid token');
  //   }
  // }
// }
