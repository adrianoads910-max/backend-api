import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SubstanceController } from './substances.controller';
import { SubstanceService } from './substances.service';

@Module({
  imports: [PrismaModule],
  controllers: [SubstanceController],
  providers: [SubstanceService],
})
export class SubstancesModule {}
