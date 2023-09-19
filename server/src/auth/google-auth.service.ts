// google-auth.service.ts

import axios from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {
  async verifyAccessToken(accessToken: string): Promise<boolean> {
    try {
      const response = await axios.get('https://www.googleapis.com/oauth2/v1/tokeninfo', {
        params: { access_token: accessToken },
      });

      return response.status === 200;
    } catch (error) {

      return false;
    }
  }
}
