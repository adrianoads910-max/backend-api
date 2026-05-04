import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SampleService } from './sample.service';
import { createSampleSchema, type CreateSampleDto } from './dto/create-sample.dto';
import { updateSampleSchema, type UpdateSampleDto } from './dto/update-sample.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { SampleSubstanceService } from './sample-substance.service';

@Controller('sample')
export class SampleController {
  constructor(
    private readonly sampleService: SampleService,
    private readonly sampleSubstanceService: SampleSubstanceService,) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createSampleSchema))
  create(@Body() dto: CreateSampleDto) {
    return this.sampleService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.sampleService.findAll();
  }

  @Get('with-substances')
  @UseGuards(JwtAuthGuard)
  findAllWithSubstances() {
    return this.sampleSubstanceService.findAllWithSubstances();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(+id);
  }

  @Patch(':id/substance/:substanceId')
  @UseGuards(JwtAuthGuard)
  updateSubstance(
    @Param('id', ParseIntPipe) id: number,
    @Param('substanceId', ParseIntPipe) substanceId: number,
    @Body() body: { relativeArea?: number; concentration?: number; extraNote?: string },
  ) {
    return this.sampleSubstanceService.updateSubstance(id, substanceId, body);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateSampleSchema)) dto: UpdateSampleDto,
  ) {
    return this.sampleService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.sampleService.remove(+id);
  }

  @Post(':id/substance')
  @UseGuards(JwtAuthGuard)
  addSubstance(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { substanceId: number; relativeArea?: number; extraNote?: string, concentration?: number },
  ) {
    return this.sampleSubstanceService.addSubstance(id, body.substanceId, body.relativeArea, body.extraNote, body.concentration);
  }

  @Get(':id/substance')
  @UseGuards(JwtAuthGuard)
  findSubstances(@Param('id', ParseIntPipe) id: number) {
    return this.sampleSubstanceService.findSubstances(id);
  }

  @Delete(':id/substance/:substanceId')
  @UseGuards(JwtAuthGuard)
  removeSubstance(
    @Param('id', ParseIntPipe) id: number,
    @Param('substanceId', ParseIntPipe) substanceId: number,
  ) {
    return this.sampleSubstanceService.removeSubstance(id, substanceId);
  }
}

