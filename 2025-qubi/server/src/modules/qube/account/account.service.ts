import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository';
import { Account } from './account.schema';
import { OmitTimestamps } from 'src/helpers/omit-timestamps';
import { CryptoService } from '../crypto/crypto.service';
import { CreateAccountDto } from './dto/account-create.dto';
import { AccountStatus } from './account.interface';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async findOne(filter: Partial<Account> & { _id?: string }) {
    return this.accountRepository.findOne(filter);
  }

  async find(filter?: Partial<Account>) {
    return this.accountRepository.find(filter);
  }

  async create(dto: CreateAccountDto) {
    const account: OmitTimestamps<Account> = {
      ...dto,
      status: AccountStatus.ACTIVE,
    };
    account.password = await this.cryptoService.hashPassword(account.password);

    return this.accountRepository.create(account);
  }

  async updateOne(
    filter: Partial<Account> & { _id?: string },
    partialAccount: Partial<OmitTimestamps<Account>>,
  ) {
    return this.accountRepository.updateOne(filter, partialAccount);
  }

  async deleteOne(
    filter: Partial<Account> & { _id?: string },
  ): Promise<{ deletedCount: number }> {
    return this.accountRepository.deleteOne(filter);
  }
}
