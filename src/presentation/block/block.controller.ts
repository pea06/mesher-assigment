import { Controller, Get, Inject, Param } from '@nestjs/common';
import { QueryBlockByHashUsecase } from '../../application/block/query-block-by-hash.usecase';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BlockResponse } from '../../application/block/dtos/block.response';

@Controller('block')
@ApiTags('blocks')
export class BlockController {
  constructor(
    @Inject(QueryBlockByHashUsecase)
    private readonly getBlockByHashUseCase: QueryBlockByHashUsecase,
  ) {}

  @Get(':hash')
  @ApiOperation({ summary: 'Block hash를 기준으로 Block을 조회합니다.' })
  @ApiParam({ name: 'hash', type: 'string', required: true, description: 'block hash' })
  @ApiOkResponse({ type: BlockResponse, description: 'Block, TransactionReceipt, Log를 반환합니다.', })
  async getBlockByHash(@Param('hash') hash: string): Promise<BlockResponse> {
    return this.getBlockByHashUseCase.execute(hash);
  }
}