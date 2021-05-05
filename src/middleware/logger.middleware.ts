import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `HttpRequest... host: ${req.headers.host}, url: ${req.originalUrl}, method: ${req.method}`,
    );
    next();
  }
}
