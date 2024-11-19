"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
var amqp = require('amqplib/callback_api');
let AppController = AppController_1 = class AppController {
    constructor() {
        this.logger = new common_1.Logger(AppController_1.name);
    }
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
                channel.consume(queue, (msg) => {
                    if (msg !== null) {
                        const content = msg.content.toString();
                        this.logger.log(`Received: ${content}`);
                        channel.ack(msg);
                    }
                }, {
                    noAck: false,
                });
            });
        });
    }
};
exports.AppController = AppController;
exports.AppController = AppController = AppController_1 = __decorate([
    (0, common_1.Controller)('delivery')
], AppController);
//# sourceMappingURL=app.controller.js.map