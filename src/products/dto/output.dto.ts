import { Field, ObjectType } from '@nestjs/graphql';
import { type } from 'os';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Entity } from 'typeorm';
import { Category } from '../entities/categories.entity';
import { Product } from '../entities/products.entity';

@ObjectType()
export class ProductsOutput extends CoreOutput {
  @Field((type) => [Product])
  data?: Product[];
  @Field()
  hasNext?: boolean;
}

@ObjectType()
export class ProductOutput extends CoreOutput {
  @Field()
  data?: Product;
}

@ObjectType()
export class CategoriesOutput extends CoreOutput {
  @Field((type) => [Category])
  data?: Category[];
}

@ObjectType()
export class CategoryOutput extends CoreOutput {
  @Field(() => Category)
  data?: Category;
}
