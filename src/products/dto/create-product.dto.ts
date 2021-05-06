import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';
import { type } from 'os';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../entities/products.entity';

@InputType()
export class CreateProductDto extends OmitType(Product, ['id', 'categories']) {
  @IsArray()
  @IsOptional()
  @Field((type) => [Int], { nullable: true })
  categoryIds?: number[];
}

@ObjectType()
export class CreateProductOutput extends CoreOutput {}
