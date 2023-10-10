//authController.ts
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccountMiddleware } from 'src/middlewares/auth/account.middleware';

@Controller('google')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @UseInterceptors(AccountMiddleware)
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const user = req.user;
    const created = user.created;
    const jwtPayload = {
      accessToken: user.accessToken,
      created,
    };

    const jwtToken = this.jwtService.sign(jwtPayload, { expiresIn: '7d' });

    res.cookie('token', jwtToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days in milliseconds
    });

    if (!created) {
      res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/contact`);
    }
  }

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('token');
    res.redirect(`${process.env.CLIENT_URL}`);
  }
}
