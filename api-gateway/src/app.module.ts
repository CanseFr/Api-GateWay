import {MiddlewareConsumer, Module} from '@nestjs/common';
import { ProxyService } from './proxy.service';
import {HttpModule} from "@nestjs/axios";
import {LoggerMiddleware} from "./middleware/middleware";
import {ProxyController} from "./app.controller";

@Module({
  imports: [HttpModule],
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes('*');
  }
}
