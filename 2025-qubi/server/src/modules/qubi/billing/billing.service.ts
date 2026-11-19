import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { OperationService } from '../operation/operation.service';
import { TransactionService } from '../transaction/transaction.service';
import { OperationMessages } from '../operation/constants/operation-messages';
import { AccountMessages } from '../account/constants/account-messages';
import { TransactionType } from '../transaction/transaction.interface';

@Injectable()
export class BillingService {
  constructor(
    private readonly accountService: AccountService,
    private readonly operationService: OperationService,
    private readonly transactionService: TransactionService,
  ) {}

  async withdrawForOperation(accountId: number, operationCode: string) {
    const operation = await this.operationService.findOne({
      code: operationCode,
    });
    if (!operation)
      throw new NotFoundException(OperationMessages.OPERATION_NOT_FOUND);

    const account = await this.accountService.findOne({ id: accountId });
    if (!account)
      throw new NotFoundException(AccountMessages.ACCOUNT_NOT_FOUND);
    if (account.balance < operation.cost)
      throw new BadRequestException(
        AccountMessages.ACCOUNT_INSUFFICIENT_BALANCE,
      );

    await this.accountService.updateOne(
      { id: accountId },
      { balance: account.balance - operation.cost },
    );

    await this.transactionService.create({
      accountId,
      type: TransactionType.DEBIT,
      amount: operation.cost,
      operationCode: operation.code,
      description: operation.name,
    });
  }

  async deposit(accountId: number, amount: number, description = 'Пополнение') {
    const account = await this.accountService.findOne({ id: accountId });
    if (!account)
      throw new NotFoundException(AccountMessages.ACCOUNT_NOT_FOUND);

    await this.accountService.updateOne(
      { id: accountId },
      { balance: account.balance + amount },
    );

    await this.transactionService.create({
      accountId,
      type: TransactionType.CREDIT,
      amount,
      operationCode: 'manual_topup',
      description,
    });
  }
}
