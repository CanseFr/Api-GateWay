import {Controller} from '@nestjs/common';
import {AppService} from "./app.service";

@Controller('delivery')
export class AppController {
    constructor(private readonly deliveryService: AppService) {}

}
