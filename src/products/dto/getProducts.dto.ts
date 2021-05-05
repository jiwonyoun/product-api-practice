import { IsOptional, IsString } from 'class-validator';

export class getProductsDto {
  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  pageSize?: string;
}
