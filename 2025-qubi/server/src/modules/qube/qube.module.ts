import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
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

@Module({
  imports: [
    AccountModule,
    AdminModule,
    AiModule,
    AuthCorpModule,
    AuthPublicModule,
    BillingModule,
    CryptoModule,
    OperationModule,
    OutputFilterModule,
    TicketModule,
    TransactionModule,
  ],
  providers: [],
})
export class QubeModule {}
