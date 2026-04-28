// src/substance/substance.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSubstanceDto } from "./dto/create-substance.dto";
import { UpdateSubstanceDto } from "./dto/update-substance.dto";

@Injectable()
export class SubstanceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSubstanceDto) {
    return this.prisma.substance.create({
      data: {
        nist: dto.nist,
        tR: dto.tR,
        name: dto.name,
        class: dto.class,
        molecularFormula: dto.molecularFormula,
        molecularWeight: dto.molecularWeight,
        ionBase: {
          create: {
            mz: dto.ionBase.mz,
            intensity: dto.ionBase.intensity,
          },
        },
        otherIons: {
          create: dto.otherIons.map((ion) => ({
            mz: ion.mz,
            intensity: ion.intensity,
          })),
        },
      },
      include: {
        ionBase: true,
        otherIons: true,
      },
    });
  }

  async findAll() {
    return this.prisma.substance.findMany({
      include: {
        ionBase: true,
        otherIons: true,
      },
    });
  }

  async findOne(id: number) {
    const substance = await this.prisma.substance.findUnique({
      where: { id },
      include: {
        ionBase: true,
        otherIons: true,
      },
    });

    if (!substance) throw new NotFoundException("Substance not found");

    return substance;
  }

  async update(id: number, dto: UpdateSubstanceDto) {
    const substance = await this.prisma.substance.findUnique({ where: { id } });
    if (!substance) throw new NotFoundException("Substance not found");

    const { ionBase, otherIons, ...rest } = dto;

    return this.prisma.substance.update({
      where: { id },
      data: {
        ...rest,
        ...(ionBase && {
          ionBase: {
            update: {
              mz: ionBase.mz,
              intensity: ionBase.intensity,
            },
          },
        }),
        ...(otherIons && {
          otherIons: {
            deleteMany: {},
            create: otherIons.map((ion) => ({
              mz: ion.mz,
              intensity: ion.intensity,
            })),
          },
        }),
      },
      include: {
        ionBase: true,
        otherIons: true,
      },
    });
  }
}