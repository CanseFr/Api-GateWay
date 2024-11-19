export class CreatePaymentDto {
  readonly orderId: string;
  readonly amount: number;
  readonly paymentMethod: string;
}
