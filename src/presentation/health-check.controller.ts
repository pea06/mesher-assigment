import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health-checks')
export class HealthCheckController {
  @Get()
  health() {
    return { status: 'ok' };
  }
}