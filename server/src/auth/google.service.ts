//google.service.ts
import axios from 'axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GoogleService {
  async getUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get(
        'https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.email;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw new UnauthorizedException();
    }
  }
}
