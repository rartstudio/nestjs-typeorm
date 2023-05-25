import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { UserPostModule } from './user-post/user-post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().required(),
        DATABASE_MASTER_HOST: Joi.string().required(),
        DATABASE_MASTER_PORT: Joi.number().required(),
        DATABASE_MASTER_USERNAME: Joi.string().required(),
        DATABASE_MASTER_PASSWORD: Joi.string().required(),
        DATABASE_MASTER_NAME: Joi.string().required(),
        DATABASE_SLAVE_1_HOST: Joi.string().required(),
        DATABASE_SLAVE_1_PORT: Joi.number().required(),
        DATABASE_SLAVE_1_USERNAME: Joi.string().required(),
        DATABASE_SLAVE_1_PASSWORD: Joi.string().required(),
        DATABASE_SLAVE_1_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        logging: true,
        useUTC: true,
        replication: {
          master: {
            host: configService.get('DATABASE_MASTER_HOST'),
            port: configService.get('DATABASE_MASTER_PORT'),
            username: configService.get('DATABASE_MASTER_USERNAME'),
            password: configService.get('DATABASE_MASTER_PASSWORD'),
            database: configService.get('DATABASE_MASTER_NAME'),
          },
          slaves: [
            {
              host: configService.get('DATABASE_SLAVE_1_HOST'),
              port: configService.get('DATABASE_SLAVE_1_PORT'),
              username: configService.get('DATABASE_SLAVE_1_USERNAME'),
              password: configService.get('DATABASE_SLAVE_1_PASSWORD'),
              database: configService.get('DATABASE_SLAVE_1_NAME'),
            },
          ],
        },
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Add your entity files path here
        synchronize: true,
        poolSize: 2,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    CategoryModule,
    UserPostModule,
  ],
  providers: [
    {
      useClass: ClassSerializerInterceptor,
      provide: APP_INTERCEPTOR,
    },
  ],
})
export class AppModule {}
