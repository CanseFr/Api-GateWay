"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const amqp = require("amqplib/callback_api");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
let MessageService = class MessageService {
    constructor() { }
    onModuleInit() {
        const httpServer = (0, http_1.createServer)();
        this.server = new socket_io_1.Server(httpServer, {
            cors: {
                origin: '*',
            },
        });
        httpServer.listen(3002, () => {
            console.log('Socket.IO server listening on port 3002');
        });
        this.server.on('connection', (socket) => {
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
                channel.consume(queue, (msg) => {
                    try {
                        if (msg !== null) {
                            console.log(" [x] Received %s", msg.content.toString());
                            this.sendAlertDeliveryToFront(msg.content.toString());
                            channel.ack(msg);
                        }
                    }
                    catch (err) {
                        console.error("Erreur lors de la consommation du message : ", err);
                    }
                }, {
                    noAck: false,
                });
            });
        });
    }
    sendAlertDeliveryToFront(message) {
        this.server.emit('alert', { message });
        console.log(`Alert sent to front: ${message}`);
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MessageService);
//# sourceMappingURL=app.service.js.map