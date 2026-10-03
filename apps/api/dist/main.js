import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ObserveInstrument } from './observe.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        instrument: ObserveInstrument,
    });
    app.setGlobalPrefix('api/v1');
    if (process.env.NODE_ENV !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('ERP + CRM API')
            .setDescription('Internal ERP + CRM, phase 1')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('docs', app, document, { useGlobalPrefix: true });
    }
    await app.listen(process.env.API_PORT ?? 3001, '0.0.0.0');
}
await bootstrap();
//# sourceMappingURL=main.js.map