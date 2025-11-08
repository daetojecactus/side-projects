import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../crypto/crypto.service';
import { AdminService } from '../admin/admin.service';
import { AuthCorpLoginDto } from './dto/auth-corp-login.dto';

@Injectable()
export class AuthCorpService {
  constructor(
    private readonly adminService: AdminService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(login: string, password: string) {
    const admin = await this.adminService.findOne({ login });
    if (!admin) return null;
    const valid = await this.cryptoService.comparePasswords(
      password,
      admin.password,
    );
    return valid ? admin : null;
  }

  async loginCorp(dto: AuthCorpLoginDto) {
    const admin = await this.validateAdmin(dto.login, dto.password);
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const payload = { login: admin.login, status: admin.status };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
