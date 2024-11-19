// import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// import * as amqp from 'amqplib/callback_api';
// const { Server } = require('socket.io');
// const io = new Server(server);
//
// @Injectable()
// export class AppService implements OnModuleInit{
//   private readonly logger = new Logger(AppService.name);
//
//   onModuleInit() {
//     this.consumeMessages();
//   }
//
//   consumeMessages() {
//     amqp.connect('amqp://localhost', (error0, connection) => {
//       if (error0) {
//         throw error0;
//       }
//
//       connection.createChannel((error1, channel) => {
//         if (error1) {
//           throw error1;
//         }
//
//         const queue = 'paiement-to-delivery';
//
//         channel.assertQueue(queue, {
//           durable: false,
//         });
//
//         this.logger.log(`Waiting for messages in ${queue}`);
//         console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
//
//         channel.consume(
//             queue,
//             (msg) => {
//               try {
//                 if (msg !== null) {
//                   console.log(" [x] Received %s", msg.content.toString());
//                   this.sendAlertDeliveryToFront()
//                   channel.ack(msg);
//                 }
//               } catch (err) {
//                 console.error("Erreur lors de la consommation du message : ", err);
//               }
//             },
//             {
//               noAck: false,
//             }
//         );
//       });
//     });
//   }
//
//
//   sendAlertDeliveryToFront(){
//     io.on('connection', (socket) => {
//       console.log('a user connected');
//     });
//   }
//
//
//
//
// }


import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib/callback_api';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

@Injectable()
export class MessageService implements OnModuleInit {
  private server: Server;

  constructor() {}

  onModuleInit() {
    const httpServer = createServer();
    this.server = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });

    httpServer.listen(3002, () => {
      console.log('Socket.IO server listening on port 3002');
    });

    this.server.on('connection', (socket: Socket) => {
      console.log('A user connected');
    });
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

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(
            queue,
            (msg) => {
              try {
                if (msg !== null) {
                  console.log(" [x] Received %s", msg.content.toString());
                  this.sendAlertDeliveryToFront(msg.content.toString());
                  channel.ack(msg);
                }
              } catch (err) {
                console.error("Erreur lors de la consommation du message : ", err);
              }
            },
            {
              noAck: false,
            },
        );
      });
    });
  }

  sendAlertDeliveryToFront(message: string) {
    this.server.emit('alert', { message });
    console.log(`Alert sent to front: ${message}`);
  }
}
