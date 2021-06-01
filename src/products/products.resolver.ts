import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  CreateProductInput,
  CreateProductOutput,
} from './dto/create-product.dto';
import { DeleteProductInput } from './dto/delete-product.dto';
import {
  CategoriesOutput,
  ProductOutput,
  ProductsOutput,
} from './dto/output.dto';
import { UpdateProductInput } from './dto/update-product.dto';

import { Product } from './entities/products.entity';
import { ProductService } from './products.service';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

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

  @Mutation((type) => CreateProductOutput)
  product_create(
    @Args('input') createProductDto: CreateProductInput,
  ): Promise<CreateProductOutput> {
    return this.productService.create(createProductDto);
  }

  // @Mutation((type) => Boolean)
  // async product_delete(@Args('id') id: DeleteProductInput) {
  //   try {
  //     await this.productService.deleteOne(id);
  //     console.log('삭제 완료');
  //     return true;
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // }

  @Mutation((type) => Boolean)
  async product_update(
    @Args('id') id: number,
    @Args('input') updateData: UpdateProductInput,
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
