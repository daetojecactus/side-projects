import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CryptoModule } from '../crypto/crypto.module';
import { AdminModule } from '../admin/admin.module';
import { AuthCorpService } from './auth-corp.service';
import { JwtCorpStrategy } from './jwt-corp.strategy';
import { AuthCorpController } from './auth-corp.controller';

@Module({
  imports: [
    AdminModule,
    CryptoModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_CORP_SECRET || 'corp_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthCorpService, JwtCorpStrategy],
  controllers: [AuthCorpController],
  exports: [AuthCorpService, JwtModule],
})
export class AuthCorpModule {}
