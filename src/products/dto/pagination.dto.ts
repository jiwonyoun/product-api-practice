import { ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ObjectType()
export class PaginationOutput {
  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  pageSize?: string;
}
