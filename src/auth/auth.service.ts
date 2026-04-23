import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.schema";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from "./dto/login-auth.schema";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwt: JwtService) {}

  async register(data: CreateAuthDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exists) {
      throw new ConflictException("Email already in use");
    }

    const hash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async login(data: LoginAuthDto) {
  const user = await this.prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new UnauthorizedException("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new UnauthorizedException("Invalid credentials");
  }

  const payload = {
    sub: user.id,
    email: user.email,
  };

  return {
    access_token: this.jwt.sign(payload),
  };
}
}