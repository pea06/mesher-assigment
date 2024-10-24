import { BaseException } from '../../../infrastructure/common/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';

export class TxReceiptDoesNotExistException extends BaseException {
  constructor(txHash: string) {
    super({
      code: 'NOT_BELONGING',
      message: `${txHash}의 해당하는 tx receipt를 찾지 못하였습니다.`,
      status: HttpStatus.NOT_FOUND,
    });
  }
}