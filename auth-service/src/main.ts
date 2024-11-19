import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {NestFactory, Reflector} from '@nestjs/core';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: [
            'http://localhost:3000',
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,

    });

    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    const config = new DocumentBuilder()
        .setTitle('Auth')
        .setDescription('Authentication service')
        .setVersion('0.1')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-auth', app, document);

    await app.listen(3001);
}

bootstrap();
