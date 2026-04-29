import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('User already exists');
      console.log('User already exists');
    }

     const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { ...dto, password: hashed },
    });
    console.log('User criado com sucesso');

    const { password, ...result } = user;
    return result;
  }


  async findAll() {
  const users = await this.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
  console.log('Users encontrados:', users.length);
  return users;
}

    async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('Usuário não encontrado');
    console.log('Usuário não encontrado:', user.id);

    const { password, ...result } = user;
    console.log('Usuário encontrado:', user.id);
    return result;
   
  }

    async update(id: number, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }
    const user = await this.prisma.user.update({ where: { id }, data: dto });
    const { password, ...result } = user;
    console.log('Usuário atualizado com sucesso');
    return result;
  }

    async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async remove(id: number) {
    await this.prisma.user.delete({ where: { id } });
    console.log('Usuário removido com sucesso');
    return { message: 'Usuário removido' };
  }
}
