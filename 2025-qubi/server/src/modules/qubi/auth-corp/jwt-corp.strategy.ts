import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtCorpStrategy extends PassportStrategy(Strategy, 'jwt-corp') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_CORP_SECRET || 'corp_secret_key',
    });
  }

  async validate(payload: any) {
    return payload; // Можно добавить доп. проверки
  }
}
