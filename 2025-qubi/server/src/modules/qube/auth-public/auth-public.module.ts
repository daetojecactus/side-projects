import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthPublicService } from './auth-public.service';
import { AuthPublicController } from './auth-public.controller';
import { JwtPublicStrategy } from './jwt-public.strategy';
import { AccountModule } from '../account/account.module';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  imports: [
    AccountModule,
    CryptoModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_PUBLIC_SECRET || 'public_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthPublicService, JwtPublicStrategy],
  controllers: [AuthPublicController],
  exports: [AuthPublicService, JwtModule],
})
export class AuthPublicModule {}
