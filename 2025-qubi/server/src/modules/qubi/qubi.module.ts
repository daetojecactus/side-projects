import { Module } from '@nestjs/common';
import { OutputFilterModule } from './output-filter/output-filter.module';
import { AccountModule } from './account/account.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthPublicModule } from './auth-public/auth-public.module';
import { AdminModule } from './admin/admin.module';
import { AuthCorpModule } from './auth-corp/auth-corp.module';
import { BillingModule } from './billing/billing.module';
import { OperationModule } from './operation/operation.module';
import { TransactionModule } from './transaction/transaction.module';
import { TicketModule } from './ticket/ticket.module';
import { AiModule } from './ai/ai.module';
import { OpenAiModule } from '../vendors/openai/openai.module';
import { StockImagesModule } from './stock-images/stock-images.module';
import { PexelsModule } from '../vendors/pexels/pexels.module';
import { InputFilterModule } from './input-filter/input-filter.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    AccountModule,
    AdminModule,
    AiModule,
    OpenAiModule,
    StockImagesModule,
    PexelsModule,
    AuthCorpModule,
    AuthPublicModule,
    BillingModule,
    CryptoModule,
    OperationModule,
    OutputFilterModule,
    TicketModule,
    TransactionModule,
    InputFilterModule,
    WorkflowModule,
  ],
  providers: [],
})
export class QubiModule {}
