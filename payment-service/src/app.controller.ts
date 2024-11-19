import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {CreateUserDto} from "auth-service/dist/src/users/dto/create-user.dto";

@Controller("payments")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createPaiement(@Body() paiement:{amount: number, name: string, adress:string}):boolean {
    console.log("ici")
    return this.appService.apiPaiement(paiement);
  }
}

