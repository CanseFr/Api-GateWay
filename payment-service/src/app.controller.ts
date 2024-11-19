import {Body, Controller, Post} from '@nestjs/common';
import {AppService} from './app.service';

@Controller("payments")
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post()
    createPaiement(@Body() paiement: { amount: number, name: string, adress: string }): boolean {
        console.log("ici")
        return this.appService.apiPaiement(paiement);
    }
}

