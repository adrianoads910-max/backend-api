import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { env } from '../config/env';
import { JwtStrategy } from './strategies/jwt.strategy';
import { StringValue } from 'ms';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: {
  expiresIn: env.JWT_EXPIRES_IN as StringValue
},    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}