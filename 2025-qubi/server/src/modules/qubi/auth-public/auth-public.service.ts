import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { CryptoService } from '../crypto/crypto.service';
import { AuthPublicLoginDto } from './dto/auth-public-login.dto';

@Injectable()
export class AuthPublicService {
  constructor(
    private readonly accountService: AccountService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(id: number, password: string) {
    const account = await this.accountService.findOne({ id });
    if (!account) return null;
    const valid = await this.cryptoService.comparePasswords(
      password,
      account.password,
    );
    return valid ? account : null;
  }

  async loginPublic(dto: AuthPublicLoginDto) {
    const account = await this.validateAccount(dto.id, dto.password);
    if (!account) throw new UnauthorizedException('Invalid credentials');

    const payload = { id: account.id, status: account.status };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
