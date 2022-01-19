import { Logger } from '@nestjs/common';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { Product } from 'src/products/entities/products.entity';

@Injectable()
export class DateFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logging = (response) => {
      console.log(response.data);
      response.data.forEach((product: Product) => {
        // product.createdAt = moment(product.createdAt).locale('ko');
        console.log(product.createdAt);
      });
    };
    return next.handle().pipe(tap((data) => logging(data)));
  }
}
