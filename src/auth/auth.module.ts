import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'supersecret', // depois vamos mover pra .env
      signOptions: { expiresIn: '1d' },
      
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}