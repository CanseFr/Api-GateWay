import { Injectable } from '@nestjs/common';

@Injectable()
export class DeliveryService {
  private deliveries = [];

  // Create new delivery
  createDelivery(data: { orderId: string; address: string }) {
    const newDelivery = { id: Date.now(), ...data, status: 'pending' };
    this.deliveries.push(newDelivery);
    return newDelivery;
  }

  // Get all deliveries
  getDeliveries() {
    return this.deliveries;
  }

  // Update delivery status
  updateStatus(id: number, status: string) {
    const delivery = this.deliveries.find((d) => d.id === id);
    if (!delivery) {
      throw new Error('Delivery not found');
    }
    delivery.status = status;
    return delivery;
  }
}