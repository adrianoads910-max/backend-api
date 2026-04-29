import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SampleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSampleDto) {
    console.log('Sample criada:', dto);
    return this.prisma.sample.create({
      data: {
        name: dto.name,
        description: dto.description,
      },
    });
  }

  async findAll() {
    const samples = await this.prisma.sample.findMany();
    console.log('Samples encontradas:', samples.length);
    return samples;
  }

  async findOne(id: number) {
    const sample = await this.prisma.sample.findUnique({
      where: { id },
    });
    if (!sample) throw new NotFoundException(`Sample with id ${id} not found`);
    console.log('Sample encontrada:', sample.id);
    return sample;
  }

  async update(id: number, dto: UpdateSampleDto) {
  await this.findOne(id); 
  console.log('Updating Sample:', { id, ...dto });
  return this.prisma.sample.update({
    where: { id },
    data: dto, 
  });
}

async remove(id: number) {
  await this.findOne(id);
  console.log('Removing Sample:', { id });
  return this.prisma.sample.delete({ where: { id } });
}
}
