import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { OutputFilterModule } from './output-filter/output-filter.module';
import { AccountModule } from './account/account.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthPublicModule } from './auth-public/auth-public.module';
import { AdminModule } from './admin/admin.module';
import { AuthCorpModule } from './auth-corp/auth-corp.module';

@Module({
  imports: [
    AiModule,
    OutputFilterModule,
    AccountModule,
    AdminModule,
    CryptoModule,
    AuthPublicModule,
    AuthCorpModule,
  ],
  providers: [],
})
export class QubeModule {}
