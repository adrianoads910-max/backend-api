import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SampleSubstanceService {
  constructor(private prisma: PrismaService) {}

  async addSubstance(sampleId: number, substanceId: number, relativeArea?: number, extraNote?: string, concentration?: number) {
    const sample = await this.prisma.sample.findUnique({ where: { id: sampleId } });
    if (!sample) throw new NotFoundException(`Sample ${sampleId} not found`);

    const substance = await this.prisma.substance.findUnique({ where: { id: substanceId } });
    if (!substance) throw new NotFoundException(`Substance ${substanceId} not found`);

    return this.prisma.sampleSubstance.create({
      data: { sampleId, substanceId, relativeArea, extraNote, concentration },
      include: { substance: true },
    });
  }

  async removeSubstance(sampleId: number, substanceId: number) {
    return this.prisma.sampleSubstance.delete({
      where: {
        sampleId_substanceId: { sampleId, substanceId },
      },
    });
  }

  async findSubstances(sampleId: number) {
    return this.prisma.sampleSubstance.findMany({
      where: { sampleId },
      include: {
        substance: {
          include: { ionBase: true, otherIons: true },
        },
      },
    });
  }

async findAllWithSubstances() {
  return this.prisma.sample.findMany({
    include: {
      substances: {          
        include: {
          substance: {
            include: { ionBase: true, otherIons: true },
          },
        },
      },
      matriz: true,          
    },
  });
}

async updateSubstance(
  sampleId: number,
  substanceId: number,
  data: { relativeArea?: number; concentration?: number; extraNote?: string },
) {
  const relation = await this.prisma.sampleSubstance.findUnique({
    where: { sampleId_substanceId: { sampleId, substanceId } },
  });

  if (!relation) throw new NotFoundException(
    `Relação entre Sample ${sampleId} e Substance ${substanceId} não encontrada`
  );

  return this.prisma.sampleSubstance.update({
    where: { sampleId_substanceId: { sampleId, substanceId } },
    data,
    include: { substance: true },
  });
}
}