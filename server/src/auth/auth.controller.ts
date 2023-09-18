//authController.ts
import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccountMiddleware } from 'src/middlewares/auth/account.middleware';
import { v4 as uuidv4 } from 'uuid';
// import { UserService } from 'src/user/user.service';

@Controller('google')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly userService: UserService,
  ) { }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  @UseInterceptors(AccountMiddleware)
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const user = req.user;
    // const sessionId = uuidv4();
    const jwtPayload = {
      //  user_id: user.user_id,
      // email: user.email,
      // role: user.role,
      // sessionId,
      accessToken: user.accessToken,
      created: user.created,
    };

    const jwtToken = this.jwtService.sign(jwtPayload);

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 5);

    res.cookie('token', jwtToken, {
      expires: expirationDate,
    });
    if (!user.created) {
      res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    } else {
      res.redirect(`${process.env.CLIENT_URL}/contact`);
    }
  };

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('token');
    res.redirect(`${process.env.CLIENT_URL}`);
  }
}
