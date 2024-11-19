import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto/create-payment.dto';

@Injectable()
export class PaymentService {
  processPayment(createPaymentDto: CreatePaymentDto): { success: boolean; message: string } {
    // MOC : On simule un paiement réussi ou échoué
    const isPaymentSuccessful = Math.random() > 0.5; // 50% de chance de succès

    if (isPaymentSuccessful) {
      return { success: true, message: 'Paiement validé avec succès' };
    }
    return { success: false, message: 'Le paiement a échoué. Veuillez réessayer.' };
  }
}
