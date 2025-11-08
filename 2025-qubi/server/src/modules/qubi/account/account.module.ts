import { Module } from '@nestjs/common';
import { CryptoModule } from '../crypto/crypto.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    CryptoModule,
  ],
  providers: [AccountRepository, AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
