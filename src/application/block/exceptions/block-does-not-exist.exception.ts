import { BaseException } from '../../../infrastructure/common/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';

export class BlockDoesNotExistException extends BaseException{
  constructor(hash: string) {
    super({
      code: 'NOT_BELONGING',
      message: `${hash}의 해당하는 블록을 찾지 못하였습니다.`,
      status: HttpStatus.NOT_FOUND,
    });
  }
}