import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  RequestMethod,
  UnprocessableEntityException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const whitelistUrl = ['http://localhost:4002'];
  const config = new DocumentBuilder()
    .setTitle('')
    .setDescription('API Description')
    .setVersion('1')
    .addBearerAuth()
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const customErrors = errors.map((el: ValidationError) => {
          return {
            field: el.property,
            message: Object.values(el.constraints),
          };
        });

        //convert
        const result = {};
        for (let i = 0; i < customErrors.length; i++) {
          result[customErrors[i].field] = customErrors[i].message.map(
            (el: string) => el.charAt(0).toUpperCase() + el.slice(1),
          );
        }

        return new UnprocessableEntityException(result);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    origin: function (origin, callback) {
      if (!origin || whitelistUrl.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
