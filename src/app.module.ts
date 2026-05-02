import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubstancesModule } from './substances/substances.module';
import { SampleModule } from './sample/sample.module';
import { MatrizModule } from './matriz/matriz.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, SubstancesModule, SampleModule, MatrizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
