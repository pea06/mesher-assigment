import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(params: { code: string; message: string; status: HttpStatus }) {
    const { code, message, status } = params;
    super({ code, message }, status);
  }
}