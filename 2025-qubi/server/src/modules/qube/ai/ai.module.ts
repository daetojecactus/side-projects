import { Module } from '@nestjs/common';
import { AiRepository } from './ai.repository';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiApiClient } from './ai.client';
import { OutputFilterModule } from '../output-filter/output-filter.module';
import { BillingModule } from '../billing/billing.module';

@Module({
  imports: [BillingModule, OutputFilterModule],
  controllers: [AiController],
  providers: [AiRepository, AiService, AiApiClient],
  exports: [AiService],
})
export class AiModule {}
