import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Product } from './products.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  @IsOptional()
  @Field()
  categoryName?: string;

  @Field((type) => [Product], { nullable: true })
  @ManyToMany((type) => Product, (product) => product.categories, {
    nullable: true,
  })
  products?: Product[];
}
