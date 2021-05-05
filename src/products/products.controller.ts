import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { Roles } from 'src/role/roles.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { getProductsDto } from './dto/getProducts.dto';
import {
  CategoriesOutput,
  ProductOutput,
  ProductsOutput,
} from './dto/output.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Categories } from './entities/categories.entity';
import { ProductService } from './products.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { Product } from './entities/products.entity';

@ApiBasicAuth()
// @UseGuards(RolesGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiQuery({
    name: 'page',
    enumName: 'page',
    required: false,
    description: '페이지 시작 번호 입력 (미입력 시 전체 조회)',
  })
  @ApiQuery({
    name: 'pageSize',
    enumName: 'pageSize',
    required: false,
    description: '페이지 당 출력 갯수 입력',
  })
  @ApiTags('상품 데이터 가져오기')
  // @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  @Get()
  getAll(@Query() query: getProductsDto): Promise<ProductsOutput> {
    return this.productService.getAll(
      Number(query.page),
      Number(query.pageSize),
    );
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
    type: CreateProductDto,
  })
  @ApiTags('상품 데이터 생성하기')
  create(@Body() productData: CreateProductDto, data) {
    console.log(productData);
    return this.productService.create(productData, data);
  }

  @ApiParam({
    name: 'id',
    description: '삭제할 product의 ID값 입력',
  })
  @Delete('/:id')
  @ApiTags('상품 데이터 삭제하기')
  remove(@Param('id') productId: number) {
    return this.productService.deleteOne(productId);
  }

  @ApiParam({
    name: 'id',
    description: '수정할 product의 ID값 입력',
  })
  @ApiBody({
    type: UpdateProductDto,
  })
  @ApiTags('상품 데이터 수정하기')
  @Patch('/:id')
  patch(
    @Param('id') productId: number,
    @Body() updateData: UpdateProductDto,
    categories: Categories[],
  ) {
    return this.productService.update(productId, updateData);
  }
}
