// user/user.module.ts or the module where UserModule is defined
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { UserService } from './user.service';

@Module({
  imports: [
    // ... other imports
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserService], // Ensure UserService is included here
  exports: [UserService],
})
export class UserModule {}
