// googleStrategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { User } from 'src/database/models/users.model';
import { Role } from 'src/database/models/roles.model';
import { UserRole } from 'src/database/models/users_roles';

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
    });

    if (created) {
      const defaultRole = await Role.findOne({ where: { value: 'ADMIN' } });
      if (defaultRole) {
        await UserRole.create({ role_id: defaultRole.id, user_id: user.id });
      }
    }
    const payload = {
      provider: 'google',
      accessToken,
      created,
    };

    return payload;
  }
}
