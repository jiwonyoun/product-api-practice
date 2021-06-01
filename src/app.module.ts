import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { Category } from './products/entities/categories.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DATABASE,
      entities: [Product, Category],
      synchronize: true,
      // logging: true,
    }),
    ProductsModule,
    CommonModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('product');
    // 또는 .forRoutes({ path:'product', method: RequestMethod.GET }); - 특정 요청 method 유형을 제한
    // 또는 .forRoutes(ProductsController); - Controller class 사용 가능
  }
}
