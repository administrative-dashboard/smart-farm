// googleStrategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { User } from 'src/database/models/users.model';
import { Role } from 'src/database/models/roles.model';

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
    accessToken: string,
    refreshToken: string,
    profile: any
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const [user, created] = await User.findOrCreate({
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
        await user.$add('roles', defaultRole);
      }
    }

    const payload = {
      provider: 'google',
      email: emails[0].value,
      user_id: user.id, // Include user_id
      role: user.roles[0]?.value || 'EMPLOYEE',
      accessToken,
    };

    return payload;
  }
}