import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message: any = exception.getResponse();

    if (status == 403) {
      response.status(status).json({
        status: 'error',
        error: {
          code: status,
          message: 'Akses sumberdaya dibatasi',
        },
      });
    } else if (status == 401) {
      response.status(status).json({
        status: 'error',
        error: {
          code: status,
          message: 'Token tidak sah',
        },
      });
    } else if (status == 422) {
      response.status(status).json({
        status: 'error',
        error: {
          code: status,
          message: `Data tidak dapat diproses`,
          field: message,
        },
      });
    } else if (status == 409) {
      response.status(status).json({
        status: 'error',
        error: {
          code: status,
          message: `Data Konflik`,
          field: message,
        },
      });
    } else {
      response.status(status).json({
        status: 'error',
        error: {
          code: status,
          message: message.message,
        },
      });
    }
  }
}
