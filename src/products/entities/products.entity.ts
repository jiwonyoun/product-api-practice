import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { type } from 'os';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { RelationIdAttribute } from 'typeorm/query-builder/relation-id/RelationIdAttribute';
import { RelationIdLoader } from 'typeorm/query-builder/RelationIdLoader';
import { Category } from './categories.entity';

@InputType('ProductInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ charset: 'euckr' }) // 한글 정렬 필요 옵션
  @IsString()
  @Field()
  @ApiProperty()
  name: string;

  @Column()
  @IsNumber()
  @Field()
  @ApiProperty()
  price: number;

  @Column()
  @IsString()
  @Field()
  @ApiProperty()
  image: string;

  @Column()
  @IsString()
  @Field()
  @ApiProperty()
  web: string;

  @Field(() => [Category], { nullable: true })
  @ManyToMany(() => Category, (category) => category.products, {
    nullable: true,
  })
  @JoinTable()
  categories?: Category[];
}
