import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // console.log('Request URL:', req.url);
        // console.log('Request Method:', req.method);
        // console.log('Request Headers:', req.headers);

        // if (req.body && Object.keys(req.body).length > 0) {
            // console.log('Request Body:', req.body);
        // }
        next();
    }
}
