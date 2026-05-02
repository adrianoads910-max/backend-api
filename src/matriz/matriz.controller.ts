// src/substance/substance.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";
import { createMatrizSchema, type CreateMatrizDto } from "./dto/create-matriz.dto";
import { MatrizService } from "./matriz.service";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { type UpdateMatrizDto, updateMatrizSchema,} from "./dto/update-matriz.dto";



@Controller("matrizes")
export class MatrizController {
  constructor(private readonly matrizService: MatrizService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createMatrizSchema))
  create(@Body() dto: CreateMatrizDto) {
    return this.matrizService.create(dto);
  }

  @Get()
  findAll() {
    return this.matrizService.findAll();
  }
  
@Get("latest")
    findLast() {
    return this.matrizService.findLast();
    }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.matrizService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateMatrizSchema)) dto: UpdateMatrizDto,
  ) {
    return this.matrizService.update(id, dto);
  }
}