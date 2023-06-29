// NEST
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// External
import { urlencoded, json } from 'express';

// Internal
import { AppModule } from './app.module';

function configureMiddleware(app) {
  const configService = app.get(ConfigService);
  const prefix = configService.get('API_PREFIX') || 'api';

  app.enableCors();
  app.setGlobalPrefix(prefix);
  app.use(json({ limit: configService.get('MAX_PAYLOAD') || '50mb' }));
  app.use(
    urlencoded({
      extended: true,
      limit: configService.get('MAX_PAYLOAD') || '50mb',
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );
}

function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Wallet App API')
    .setDescription('Wallet App API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');

  configureMiddleware(app);

  if (process.env.NODE_ENV === 'development') {
    configureSwagger(app);
  }

  const port = app.get(ConfigService).get('PORT') || 3000;
  logger.log(`Server running on port: ${port}`);
  await app.listen(port);
}
bootstrap();
