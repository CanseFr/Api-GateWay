import { NestFactory } from '@nestjs/core';
import { ProxyModule } from './proxy.module';

async function bootstrap() {
  const app = await NestFactory.create(ProxyModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
    ],
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  });  await app.listen(3003);
}
bootstrap();
