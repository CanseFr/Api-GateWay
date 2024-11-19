import { Controller, Logger, OnModuleInit } from '@nestjs/common';
var amqp = require('amqplib/callback_api');

@Controller('delivery')
export class AppController implements OnModuleInit {
  private readonly logger = new Logger(AppController.name);

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

        channel.consume(
            queue,
            (msg) => {
              if (msg !== null) {
                const content = msg.content.toString();
                this.logger.log(`Received: ${content}`);
                channel.ack(msg);
              }
            },
            {
              noAck: false,
            },
        );
      });
    });
  }
}
