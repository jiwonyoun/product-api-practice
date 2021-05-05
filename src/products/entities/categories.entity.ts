import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './products.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  @IsOptional()
  @Field()
  categoryName?: string;

  @Field((type) => [Product], { nullable: true })
  @ManyToMany((Type) => Product, (product) => product.categories, {
    onDelete: 'NO ACTION', nullable: true
  })
  products?: Product[];
}
