// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  googleLogin(req) {
    if (!req.user) {
      return 'No user from Google';
    }

    const payload = {
      email: req.user.email,
      id: req.user.id,
      role: req.user.roles[0]?.value || 'EMPLOYEE',
    };

    const jwt = this.jwtService.sign(payload);

    return {
      message: 'User information from Google',
      user: req.user,
      jwt,
    };
  }
}
