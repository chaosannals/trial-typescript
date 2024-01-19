import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Talk Docs')
    .setDescription('The Talk API description')
    .setVersion('1.0')
    .addTag('talk')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useWebSocketAdapter(new WsAdapter(app));

  // app.enableCors();
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
