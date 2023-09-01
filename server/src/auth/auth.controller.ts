// auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('google')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return;
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

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('jwt');
    res.redirect('/logout-success');
  }
}
