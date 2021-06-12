import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Product } from '../entities/products.entity';

export class SearchProductsInput extends PartialType(
  PickType(Product, ['name', 'price']),
) {
  @ApiProperty()
  take?: number;

  @ApiProperty()
  cursor?: string;
}

export class SearchProductsOutput extends CoreOutput {
  data?: Product[];
}
