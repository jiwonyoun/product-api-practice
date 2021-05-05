import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';
import { Product } from '../entities/products.entity';

@InputType()
export class UpdateProductDto extends PartialType(
  PickType(Product, ['name', 'price', 'image', 'web']),
) {
  @IsArray()
  @IsOptional()
  @Field((type) => [Int])
  categoryIds?: number[];
}
