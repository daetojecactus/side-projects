import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { AccountModule } from '../account/account.module';
import { OperationModule } from '../operation/operation.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [AccountModule, OperationModule, TransactionModule],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
