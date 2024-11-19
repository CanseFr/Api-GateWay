import { Injectable } from '@nestjs/common';
var amqp = require('amqplib/callback_api');


@Injectable()
export class AppService {
  apiPaiement(paiement:{amount: number, name: string, adress:string}): boolean {
    this.giveEventToDelivery(paiement)
    return true;
  }



  giveEventToDelivery(info :{amount: number, name: string, adress:string}){
    amqp.connect('amqp://localhost', function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }
        var queue = 'paiement-to-delivery';
        const msg = JSON.stringify(info);

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log("Paiement validate, order give to delivery service", msg);
      });
    });

  }

}
