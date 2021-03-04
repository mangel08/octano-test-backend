import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

export const initSwagger = (app: INestApplication, config: ConfigService) => {
  const apiVersion = config.get('app').api_version;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rock, Scisorss, Paper Extended Game API')
    .setDescription('Api docs of game Rock, Scisorss, Paper Extended Game')
    .addApiKey({ type: 'apiKey', in: 'header', name: 'api-key' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(`api/${apiVersion}/api-docs`, app, document, {
    swaggerOptions: { displayRequestDuration: true },
  });
};
