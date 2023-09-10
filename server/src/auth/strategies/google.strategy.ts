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

    if (created ) {
      const defaultRole = await Role.findOne({ where: { value: 'EMPLOYEE' } });
      if (defaultRole) {
        await user.$add('roles', defaultRole);
      }
    }

    // if (!created) {
    //   // User already exists, check if they have the new role, and add it if not
    //   const newRoleValue = 'ADMIN'; // Replace with the desired new role value
    //   const hasNewRole = user.roles.some((role) => role.value === newRoleValue);

    //   if (!hasNewRole) {
    //     const newRole = await Role.findOne({ where: { value: newRoleValue } });
    //     if (newRole) {
    //       await user.$add('roles', newRole);
    //     }
    //   }
    // }

    const userRoles = user.roles.map((role) => role.value);
    const payload = {
      provider: 'google',
      email: emails[0].value,
      user_id: user.id, 
      role: userRoles,
      accessToken,
    };

    return payload;
  }
}