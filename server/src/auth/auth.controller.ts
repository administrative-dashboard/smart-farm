//authController.ts
import { Controller, Get, Req, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccountMiddleware } from 'src/middlewares/auth/account.middleware';
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

    const jwtPayload = {
      user_id: user.user_id,
      email: user.email,
      role: user.role,
      accessToken: user.accessToken,
    };

    const jwtToken = this.jwtService.sign(jwtPayload);

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 5);

    res.cookie('token', jwtToken, {
      expires: expirationDate,
    });

    res.redirect(`${process.env.CLIENT_URL}/contact`);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('token');
    res.redirect(`${process.env.CLIENT_URL}`);
  }

  // @Get('info')
  // @UseGuards(AuthGuard('jwt'))
  // async getSecureData(@Req() req) {
  //   const user = await this.userService.getUserInfo(req.user.jwtToken);
  //   // Handle secure data retrieval and response here
  //   return user;
  // }
}
