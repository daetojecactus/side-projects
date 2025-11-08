import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './transaction.schema';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async find(filter?: Partial<Transaction>) {
    return await this.transactionRepository.find(filter ?? {});
  }

  async create(transaction: Transaction) {
    return await this.transactionRepository.create(transaction);
  }

  async findByAccount(accountId: number) {
    return this.transactionRepository.find({ accountId });
  }
}
