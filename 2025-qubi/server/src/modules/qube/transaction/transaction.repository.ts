import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './transaction.schema';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(data: Partial<Transaction>) {
    return this.transactionModel.create(data);
  }

  async find(filter?: Partial<Transaction>) {
    return this.transactionModel.find(filter ?? {});
  }
}
