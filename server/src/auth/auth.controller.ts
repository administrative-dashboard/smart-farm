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

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res: Response) {
    const user = req.user;

    const jwtPayload = {
      email: user.email,
      role: user.role,
      accessToken: user.accessToken,
      user_id: user.user_id, // Access user_id from the payload
    };

    // Sign the JWT token
    const jwtToken = this.jwtService.sign(jwtPayload);

    res.cookie('jwt', jwtToken);

    res.redirect(`${process.env.CLIENT_URL}/contact`);
  }

  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  async getSecureData(@Req() req) {
    const user = await this.userService.getUserInfo(req.user.jwtToken);
    // Handle secure data retrieval and response here
    return user;
  }
}
