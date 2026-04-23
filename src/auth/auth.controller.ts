import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/zod-validation/zod-validation.pipe';
import { createAuthSchema } from './dto/create-auth.schema';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { loginAuthSchema } from './dto/login-auth.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService) {}

  @Post('register')
  register(
    @Body(new ZodValidationPipe(createAuthSchema)) body
  ) {
    return this.authService.register(body);
  }


  @Post('login')
  login(
    @Body(new ZodValidationPipe(loginAuthSchema))  body 
        ) {
    return this.authService.login(body);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  updateProfile(
    
  ) {
    return "update profile";
  }

  @Get('me')
@UseGuards(JwtAuthGuard)
getProfile(@Req() req) {
  return req.user;
}
}