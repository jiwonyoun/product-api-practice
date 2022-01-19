import { Field, HideField, InputType, ObjectType } from '@nestjs/graphql';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';
import * as moment from 'moment-timezone';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';

export const DateTimezoneTransformer = {
  to: (value: Date) => value.setHours(value.getHours() + 9),
  from: (value: Date) => value,
};

@InputType('ProductInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Product {
  @Column({
    default: () => 'now()',
    type: 'timestamp',
  })
  @ApiHideProperty()
  createdAt: Date;

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
