import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtPublicStrategy extends PassportStrategy(
  Strategy,
  'jwt-public',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PUBLIC_SECRET || 'public_secret_key',
    });
  }

  async validate(payload: any) {
    return payload; // Можно добавить доп. проверки
  }
}
