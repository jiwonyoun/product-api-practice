import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../entities/products.entity';

@InputType()
export class CreateProductInput extends OmitType(Product, [
  'id',
  'categories',
]) {
  @IsArray()
  @IsOptional()
  @Field(() => [Int], { nullable: true })
  categoryIds?: number[];
}

@ObjectType()
export class CreateProductOutput extends CoreOutput {}
