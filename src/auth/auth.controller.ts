import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

import { type LoginDto, LoginSchema } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}