import { Module } from '@nestjs/common';
import { AiModule } from './ai/ai.module';
import { OutputFilterModule } from './output-filter/output-filter.module';
import { AccountModule } from './account/account.module';
import { CryptoModule } from './crypto/crypto.module';
import { AuthPublicModule } from './auth-public/auth-public.module';

@Module({
  imports: [
    AiModule,
    OutputFilterModule,
    AccountModule,
    CryptoModule,
    AuthPublicModule,
  ],
  providers: [],
})
export class QubeModule {}
