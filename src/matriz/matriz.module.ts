import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MatrizController } from './matriz.controller';
import { MatrizService } from './matriz.service';


@Module({
  imports: [PrismaModule],
  controllers: [MatrizController],
  providers: [MatrizService],
})
export class MatrizModule {}
