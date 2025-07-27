import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from './inject-ket';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT.secret,
      signOptions: { expiresIn: '36000s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Export AuthService so it can be used in other modules
})
export class AuthModule {}
