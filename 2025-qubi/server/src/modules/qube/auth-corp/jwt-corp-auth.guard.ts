import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtCorpAuthGuard extends AuthGuard('jwt-corp') {}
