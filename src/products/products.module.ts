import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Categories } from './entities/categories.entity';
import { ProductResolver } from './products.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Categories])],
  exports: [TypeOrmModule],
  providers: [
    ProductService,
    ProductResolver,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // when use globally
  ],
  controllers: [ProductController],
})
export class ProductsModule {}
