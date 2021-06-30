import {
  PagingDirection,
  SortingType,
  SortProductColumn,
} from 'src/products/dto/paging-products.dto';
import {
  firstPaginationQuery,
  nextPaginationQuery,
  prevPaginationQuery,
} from 'src/common/queries/cursor-based.query';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/products.entity';

export const DEFAULT_PAGE_TAKE = 5;

export const createCursorPaginationData = async (
  entity: Repository<any>,
  direction: PagingDirection,
  column: string,
  joinTable: string,
  joinTableColumn: string,
  take: number,
  cursor: number,
  sorting: SortingType,
) => {
  try {
    if (!cursor) {
      return await entity.query(
        firstPaginationQuery(
          entity,
          column,
          joinTable,
          joinTableColumn,
          take,
          sorting,
        ),
      );
    } else {
      if (direction === PagingDirection.NEXT) {
        return await entity.query(
          nextPaginationQuery(
            entity,
            column,
            joinTable,
            joinTableColumn,
            take,
            cursor,
            sorting,
          ),
        );
      } else {
        return await entity.query(
          prevPaginationQuery(
            entity,
            column,
            joinTable,
            joinTableColumn,
            take,
            cursor,
            sorting,
          ),
        );
      }
    }
  } catch (e) {
    console.log(e);
    throw new Error('Could not make query');
  }
};
