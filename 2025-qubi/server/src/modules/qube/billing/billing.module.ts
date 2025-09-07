import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { OperationModule } from '../operation/operation.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [OperationModule, TransactionModule],
  providers: [BillingService],
  exports: [],
})
export class BillingModule {}
