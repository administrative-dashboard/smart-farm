//authController.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Controller('google')
export class AuthController {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
      ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    return;
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const user = req.user;
    // Create the JWT payload
    const jwtPayload = {
      userId: user.id,
      username: user.username,
      // Add other user information as needed
    };

    // Sign the JWT token
    const jwtToken = this.jwtService.sign(jwtPayload)

    res.cookie('jwt', jwtToken)
    


    // const { user, jwtToken } = req.user;

    // if (jwtToken) {
    //   res.cookie('jwt', jwtToken);
    //   // res.cookie('jwt', jwtToken);
    // }
    // res.header('Set-Cookie', `jwt=${jwtToken}; Path=/`);
    res.redirect(`${process.env.CLIENT_URL}/contact`);
  }

  @Get('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.clearCookie('jwt');

    res.redirect(`${process.env.CLIENT_URL}`);
  }

  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  async getSecureData(@Req() req) {
    const user = await this.userService.getUserInfo(req.user.jwtToken);
    // Handle secure data retrieval and response here
    return user;
  }
  
}
