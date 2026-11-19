import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      this.configService.get<number>('PASSWORD_SALT_ROUNDS'),
    );

    return bcrypt.hash(password, salt);
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
