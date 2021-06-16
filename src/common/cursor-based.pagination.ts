import {
  SortingType,
  SortProductColumn,
} from 'src/products/dto/paging-products.dto';
import {
  firstPaginationQuery,
  nextPaginationQuery,
} from 'src/common/queries/cursor-based.query';
import { Repository } from 'typeorm';

export const DEFAULT_PAGE_TAKE = 5;

export const createCursorPaginationData = async (
  entity: Repository<any>,
  column: string,
  take: number,
  cursor: number,
  sorting: SortingType,
) => {
  try {
    if (!cursor) {
      return await entity.query(
        firstPaginationQuery(entity, column, take, sorting),
      );
    } else {
      return await entity.query(
        nextPaginationQuery(entity, column, take, cursor, sorting),
      );
    }
  } catch (e) {
    console.log(e);
    throw new Error('Could not make query');
  }
};
