import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../entities/products.entity';

export class PagingProductsInput extends PartialType(
  PickType(Product, ['name', 'price']),
) {
  @ApiProperty()
  take?: number;

  @ApiProperty()
  cursor?: number;
}

export class SearchProductsOutput extends CoreOutput {
  data?: Product[];
}
