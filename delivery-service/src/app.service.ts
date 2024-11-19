import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib/callback_api';

@Injectable()
export class AppService implements OnModuleInit{
  private readonly logger = new Logger(AppService.name);

  onModuleInit() {
    this.consumeMessages();
  }

  consumeMessages() {
    amqp.connect('amqp://localhost', (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        const queue = 'paiement-to-delivery';

        channel.assertQueue(queue, {
          durable: false,
        });

        this.logger.log(`Waiting for messages in ${queue}`);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(
            queue,
            (msg) => {
              try {
                if (msg !== null) {
                  console.log(" [x] Received %s", msg.content.toString());
                  channel.ack(msg);
                }
              } catch (err) {
                console.error("Erreur lors de la consommation du message : ", err);
              }
            },
            {
              noAck: false,
            }
        );
      });
    });
  }




}
