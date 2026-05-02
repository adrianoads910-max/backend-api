// src/matriz/matriz.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMatrizDto } from './dto/create-matriz.dto';
import { UpdateMatrizDto } from './dto/update-matriz.dto';

@Injectable()
export class MatrizService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMatrizDto) {
    const matriz = await this.prisma.matriz.create({
      data: {
        name: dto.name,
        description: dto.description,
        image: dto.image,
        samples: dto.sampleIds
          ? { connect: dto.sampleIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { samples: true },
    });
    console.log('Matriz criada:', matriz.id);
    return matriz;
  }

  async findAll() {
    const matrizes = await this.prisma.matriz.findMany({
      include: { samples: true },
    });
    console.log('Matrizes encontradas:', matrizes.length);
    return matrizes;
  }

  async findOne(id: number) {
    const matriz = await this.prisma.matriz.findUnique({
      where: { id },
      include: { samples: true },
    });
    if (!matriz) throw new NotFoundException(`Matriz com id ${id} não encontrada`);
    return matriz;
  }

  async update(id: number, dto: UpdateMatrizDto) {
    await this.findOne(id);

    const matriz = await this.prisma.matriz.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        image: dto.image,
        samples: dto.sampleIds
          ? { set: dto.sampleIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { samples: true },
    });
    console.log('Matriz atualizada:', matriz.id);
    return matriz;
  }

  async findLast() {
  return this.prisma.matriz.findFirst({
    orderBy: { created_at: "desc" },
    include: { samples: true },
  });
}

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.matriz.delete({ where: { id } });
    console.log('Matriz removida:', id);
    return { message: 'Matriz removida com sucesso' };
  }
}