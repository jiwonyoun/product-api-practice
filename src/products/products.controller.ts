import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductInput } from './dto/create-product.dto';
import { DeleteProductInput } from './dto/delete-product.dto';
import { PaginationInput } from './dto/pagination.dto';
import {
  CategoriesOutput,
  ProductOutput,
  ProductsOutput,
} from './dto/output.dto';
import { UpdateProductInput } from './dto/update-product.dto';
import { ProductService } from './products.service';
import {
  PagingProductsInput,
  PagingProductsOutput,
} from './dto/paging-products.dto';

@ApiBasicAuth()
// @UseGuards(RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiQuery({
    name: 'page',
    required: false,
    description: '페이지 시작 번호 입력 (미입력 시 전체 조회)',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    description: '페이지 당 출력 갯수 입력',
  })
  @ApiTags('상품 데이터 가져오기')
  // @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Get()
  getAll(@Query() query: PaginationInput): Promise<ProductsOutput> {
    return this.productService.getAll(
      Number(query.page),
      Number(query.pageSize),
    );
  }

  @ApiTags('상품 데이터 가져오기')
  @Get('/paging')
  pagingProducts(
    @Query() pagingProductsInput: PagingProductsInput,
  ): Promise<PagingProductsOutput> {
    return this.productService.pagingProducts(pagingProductsInput);
  }

  @ApiParam({
    name: 'id',
    description: '조회할 product의 ID값 입력',
  })
  @ApiTags('상품 데이터 가져오기')
  @Get('/:id')
  getOne(@Param('id') productId: number): Promise<ProductOutput> {
    return this.productService.getOne(productId);
  }

  @ApiParam({
    name: 'id',
    description: '조회할 category의 ID값 입력',
  })
  @ApiTags('상품 데이터 가져오기')
  @Get('/category/:id')
  getCategory(@Param('id') categoryId: number): Promise<CategoriesOutput> {
    return this.productService.getCategory(categoryId);
  }

  @ApiParam({
    name: 'keyword',
    description: '검색할 키워드 입력',
  })
  @ApiTags('상품 데이터 가져오기')
  @Get('/search/:keyword')
  getSearch(@Param('keyword') keyword: string): Promise<ProductsOutput> {
    return this.productService.getSearch(keyword);
  }

  @Post()
  @ApiBody({
    type: CreateProductInput,
  })
  @ApiTags('상품 데이터 생성하기')
  create(@Body() createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Delete()
  @ApiTags('상품 데이터 삭제하기')
  remove(@Query('id') deleteProductInput: DeleteProductInput) {
    return this.productService.deleteOne(deleteProductInput);
  }

  @ApiParam({
    name: 'id',
    description: '수정할 product의 ID값 입력',
  })
  @ApiBody({
    type: UpdateProductInput,
  })
  @ApiTags('상품 데이터 수정하기')
  @Patch('/:id')
  patch(
    @Param('id') productId: number,
    @Body() updateData: UpdateProductInput,
  ) {
    return this.productService.update(productId, updateData);
  }
}
