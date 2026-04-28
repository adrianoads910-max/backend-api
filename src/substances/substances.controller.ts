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
import {
  createSubstanceSchema,
  type
  CreateSubstanceDto,
} from "./dto/create-substance.dto";
import {
  updateSubstanceSchema,
  type UpdateSubstanceDto,
} from "./dto/update-substance.dto";
import { ZodValidationPipe } from "src/common/pipes/zod-validation.pipe";
import { SubstanceService } from "./substances.service";

@Controller("substances")
export class SubstanceController {
  constructor(private readonly substanceService: SubstanceService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createSubstanceSchema))
  create(@Body() dto: CreateSubstanceDto) {
    return this.substanceService.create(dto);
  }

  @Get()
  findAll() {
    return this.substanceService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.substanceService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateSubstanceSchema)) dto: UpdateSubstanceDto,
  ) {
    return this.substanceService.update(id, dto);
  }
}