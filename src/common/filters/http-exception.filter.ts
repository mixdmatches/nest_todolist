/**
 * 定义了一个全局异常过滤器 HttpExceptionFilter，用于统一处理 HTTP 异常。当控制器抛出 HttpException 时，会被这个过滤器捕获，并返回统一格式的响应（包含 code、message、data、timestamp）。
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      code: status,
      message: exception.message,
      data: null,
      timestamp: new Date().toISOString(),
    });
  }
}
