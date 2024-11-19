import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment/payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  await app.listen(3004);
  console.log('Payment service is running on http://localhost:3004');
}
bootstrap();
