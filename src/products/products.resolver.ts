import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { type } from 'os';
import { CurrentUser, GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from 'src/users/users';
import { UsersService } from 'src/users/users.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  CategoriesOutput,
  ProductOutput,
  ProductsOutput,
} from './dto/output.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/products.entity';
import { ProductService } from './products.service';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Query(() => ProductsOutput)
  async products(): Promise<ProductsOutput> {
    try {
      return await this.productService.getAll();
    } catch (e) {
      console.log(e);
    }
  }

  @Query(() => ProductOutput)
  async product(@Args('id') id: number): Promise<ProductOutput> {
    try {
      console.log(await this.productService.getOne(id));
      return await this.productService.getOne(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Query(() => CategoriesOutput)
  async category(@Args('id') id: number): Promise<CategoriesOutput> {
    try {
      return await this.productService.getCategory(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Query(() => ProductsOutput)
  async products_search(
    @Args('keyword') keyword: string,
  ): Promise<ProductsOutput> {
    try {
      return await this.productService.getSearch(keyword);
    } catch (e) {
      console.log(e);
    }
  }

  @Mutation((type) => Boolean)
  async product_create(@Args('input') createProductDto: CreateProductDto) {
    return await this.productService.create(
      createProductDto,
      createProductDto.categoryIds,
    );
  }

  @Mutation((type) => Boolean)
  async product_delete(@Args('id') id: number) {
    try {
      await this.productService.deleteOne(id);
      console.log('삭제 완료');
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation((type) => Boolean)
  async product_update(
    @Args('id') id: number,
    @Args('input') updateData: UpdateProductDto,
  ) {
    try {
      await this.productService.update(id, updateData);
      console.log(updateData);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
