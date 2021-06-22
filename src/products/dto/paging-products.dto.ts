import { registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { string } from 'joi';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../entities/products.entity';

export enum SortingType {
  DESC = 'DESC',
  ASC = 'ASC',
}
export enum SortProductColumn {
  ID = 'id',
  NAME = 'name',
  PRICE = 'price',
}

export enum PagingDirection {
  NEXT = 'NEXT',
  PREV = 'PREV',
}

export class PagingProductsInput {
  @IsEnum(PagingDirection)
  @ApiProperty({
    description: 'Page Next or Prev',
  })
  direction: PagingDirection;

  @IsEnum(SortProductColumn)
  @ApiProperty({
    enum: SortProductColumn,
    description: '정렬할 기준 선택',
  })
  sortColumn: SortProductColumn;

  @IsOptional()
  take?: number;

  @IsOptional()
  cursor?: number;

  @IsEnum(SortingType)
  @ApiProperty({
    enum: SortingType,
    description: '오름차순 내림차순 선택',
  })
  sorting: SortingType;
}

export class PagingProductsOutput extends CoreOutput {
  data?: Product[];

  // cursor of the last data
  prevCursor?: number;
  nextCursor?: number;
}
