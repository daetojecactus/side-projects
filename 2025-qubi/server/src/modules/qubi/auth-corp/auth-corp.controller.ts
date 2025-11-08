import { Controller, Post, Body } from '@nestjs/common';
import { AuthCorpService } from './auth-corp.service';
import { AuthCorpLoginDto } from './dto/auth-corp-login.dto';

@Controller('auth-corp')
export class AuthCorpController {
  constructor(private readonly authCorpService: AuthCorpService) {}

  @Post('login')
  async login(@Body() dto: AuthCorpLoginDto) {
    return this.authCorpService.loginCorp(dto);
  }
}
