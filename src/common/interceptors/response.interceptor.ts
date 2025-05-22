/**
 * 定义了一个响应拦截器 ResponseInterceptor，用于统一接口返回的数据结构。所有接口的响应都会被包装成 { code, message, data, timestamp } 的格式，便于前端统一处理。
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  message: string;
  data: T | null;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        code: context.switchToHttp().getResponse().statusCode as number,
        message: '请求成功',
        data: data || null,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
