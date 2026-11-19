import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { InputFilterModule } from '../input-filter/input-filter.module';
import { AiModule } from '../ai/ai.module';
import { BillingModule } from '../billing/billing.module';
import { OutputFilterModule } from '../output-filter/output-filter.module';

@Module({
  imports: [InputFilterModule, AiModule, BillingModule, OutputFilterModule],
  providers: [WorkflowService],
  controllers: [WorkflowController],
  exports: [WorkflowService],
})
export class WorkflowModule {}
