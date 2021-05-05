import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { type } from 'os';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';

@InputType('ProductInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  @Field()
  name: string;

  @Column()
  @IsNumber()
  @Field()
  price: number;

  @Column()
  @IsString()
  @Field()
  image: string;

  @Column()
  @IsString()
  @Field()
  web: string;

  @Field((type) => [Categories], { nullable: true })
  @ManyToMany((type) => Categories, (categories) => categories.products, { nullable: true })
  @JoinTable()
  categories?: Categories[];
}
