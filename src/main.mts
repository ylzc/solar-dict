import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.mjs';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger();
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
    app.setGlobalPrefix('/api/solar');
    app.useGlobalPipes(new ValidationPipe());
    app.useLogger(logger);
    const config = new DocumentBuilder()
        .setTitle('Solar Dictionary')
        .setDescription('字典服务')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document);
    await app.listen(3000, '0.0.0.0');
    logger.log('Start on http://0.0.0.0:3000', 'Solar');
}

bootstrap();
