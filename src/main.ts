import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { url } from 'node_modules/zod/v4/mini/external.cjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);
   console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 4000}`);
}
bootstrap();
