import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { AllExceptionsFilter } from './infrastructure/common/filter/all-exceptions.filter';
import { SlackService } from './infrastructure/slack/slack.service';
import { configSwagger } from './infrastructure/config/swagger.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost, app.get(SlackService)));

  configSwagger(app);

  await app.listen(3000);
}
bootstrap();
