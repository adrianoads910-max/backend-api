import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SampleSubstanceService } from './sample-substance.service';

@Module({
  imports: [PrismaModule],
  controllers: [SampleController],
  providers: [SampleService, SampleSubstanceService],
})
export class SampleModule {}
