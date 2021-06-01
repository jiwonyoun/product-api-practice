import { InputType, ObjectType } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../entities/products.entity';

@InputType()
export class DeleteProductInput extends PickType(Product, ['id']) {}

@ObjectType()
export class DeleteProductOutput extends CoreOutput {}
