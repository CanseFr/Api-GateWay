import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  create(@Body() data: { orderId: string; address: string }) {
    return this.deliveryService.createDelivery(data);
  }

  @Get()
  findAll() {
    return this.deliveryService.getDeliveries();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.deliveryService.updateStatus(+id, body.status);
  }
}