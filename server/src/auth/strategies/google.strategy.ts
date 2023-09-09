//googleStrategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { User } from 'src/database/models/users.model';
import { Role } from 'src/database/models/roles.model';
// import * as jwt from 'jsonwebtoken';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const [_user, created] = await User.findOrCreate({
      where: { email: emails[0].value },
      defaults: {
        name: name.givenName,
        phone_number: '',
        profile_image: photos[0].value,
      },
      include: [Role],
    });

    if (created) {
      const defaultRole = await Role.findOne({ where: { value: 'EMPLOYEE' } });
      if (defaultRole) {
        await _user.$add('roles', defaultRole);
      }
    }

    // // Generate JWT token
    // const jwtPayload = {
    //   email: user.email,
    //   user_id: user.id,
    //   role: user.roles[0]?.value || 'EMPLOYEE',
    //   accessToken
    // };
    // const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET);
    // // 

    // return { user, jwtToken };

    // Need to return user specific information
    return {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    }

  }
}
