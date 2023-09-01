import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { User } from 'src/database/models/users.model';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '817971809291-glsv68au9nlkluekkvre3jvo7d38l3q0.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:5000/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
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


    done(null, user);
  }
}
