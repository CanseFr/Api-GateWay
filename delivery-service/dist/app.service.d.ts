import { OnModuleInit } from '@nestjs/common';
export declare class MessageService implements OnModuleInit {
    private server;
    constructor();
    onModuleInit(): void;
    consumeMessages(): void;
    sendAlertDeliveryToFront(message: string): void;
}
