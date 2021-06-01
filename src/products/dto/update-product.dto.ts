import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { PartialType, PickType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../entities/products.entity';

@InputType()
export class UpdateProductInput extends PartialType(
  PickType(Product, ['name', 'price', 'image', 'web']),
) {
  @IsArray()
  @IsOptional()
  @Field((type) => [Int], { nullable: true })
  categoryIds?: number[];
}

@ObjectType()
export class UpdateProductOutput extends CoreOutput {}
