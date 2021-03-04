import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as bodyParser from 'body-parser';
import { initSwagger } from './app.swagger';
import generateTypeormConfigFile from './scripts/generateTypeormConfigFile';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const appConfig = config.get('app');
  const apiVersion = appConfig.api_version;
  const corsAllowed = appConfig.cors;
  const port = appConfig.port;
  const basePath = 'api/';

  app.use(bodyParser.json({ limit: '50mb' }));
  app.setGlobalPrefix(`${basePath}${apiVersion}`);
  app.enableCors({
    origin: corsAllowed,
  });

  app.useGlobalPipes(new ValidationPipe());

  initSwagger(app, config);
  generateTypeormConfigFile(config);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();
