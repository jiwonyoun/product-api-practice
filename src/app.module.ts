import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Category } from './products/entities/categories.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { User } from './users/entities/users.entity';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { BatchModule } from './batch/batch.module';
import * as moment from 'moment-timezone';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'dev' ? '.env' : '.env.prod',
      isGlobal: true,
      ignoreEnvFile: process.env.ENV === 'prod',
      validationSchema: Joi.object({
        ENV: Joi.string().valid('dev', 'prod'),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PASS: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   port: Number(process.env.POSTGRES_PORT),
    //   username: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASS,
    //   database: process.env.POSTGRES_DATABASE,
    //   entities: [Product, Category, User],
    //   synchronize: true,
    //   // logging: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DATABASE,
      entities: [Product, Category, User],
      synchronize: true,
      logging: false,
      migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
      cli: {
        migrationsDir: 'src/migrations',
      },
      timezone: 'Z',
    }),
    ProductsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    BatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 또는 .forRoutes({ path:'product', method: RequestMethod.GET }); - 특정 요청 method 유형을 제한
    // 또는 .forRoutes(ProductsController); - Controller class 사용 가능
  }
}
