import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './account.schema';
import { OmitTimestamps } from 'src/helpers/omit-timestamps';
import { AccountMessages } from './constants/account-messages';

@Injectable()
export class AccountRepository {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async findOne(filter: Partial<Account> & { _id?: string }) {
    return await this.accountModel.findOne(filter);
  }

  async find(filter?: Partial<Account>) {
    return await this.accountModel.find(filter ?? {});
  }

  async create(Account: OmitTimestamps<Account>) {
    return await this.accountModel.create(Account);
  }

  async updateOne(
    filter: Partial<Account> & { _id?: string },
    partialAccount: Partial<OmitTimestamps<Account>>,
  ) {
    const account = await this.accountModel.findOneAndUpdate(
      filter,
      partialAccount,
      {
        new: true,
      },
    );
    if (!account) {
      throw new NotFoundException(AccountMessages.ACCOUNT_NOT_FOUND);
    }
    return account;
  }

  async deleteOne(
    filter: Partial<Account> & { _id?: string },
  ): Promise<{ deletedCount: number }> {
    const result = await this.accountModel.deleteOne(filter);
    return { deletedCount: result.deletedCount ?? 0 };
  }
}
