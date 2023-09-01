// auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return;
    // Handle the Google authentication
    // You can also redirect to Google login by returning a redirect response
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const result = await this.authService.googleLogin(req);

    if (typeof result !== 'string' && result.jwt !== null) {
      // Set the JWT in a cookie named 'jwt'
      res.cookie('jwt', result.jwt, { httpOnly: true });
    }

    res.json(result);
  }
}
