//authController.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('google')
export class AuthController {
  constructor() { }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const { user, jwtToken } = req.user;

    if (jwtToken) {
      res.cookie('jwt', jwtToken, { httpOnly: true });
    }

    res.redirect('http://localhost:3000/contact');
  }

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('jwt');

    res.redirect('http://localhost:3000/');
  }
}
