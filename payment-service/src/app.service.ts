import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  apiPaiement(paiement:{amount: number, name: string, adress:string}): boolean {
    // Call api paiement
    this.giveEventToDelivery(paiement)
    return true;
  }

  giveEventToDelivery(info :{amount: number, name: string, adress:string}){
  //
  }

}
