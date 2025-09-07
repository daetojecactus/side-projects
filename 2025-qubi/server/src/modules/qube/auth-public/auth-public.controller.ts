import { Controller, Post, Body } from '@nestjs/common';
import { AuthPublicService } from './auth-public.service';
import { AuthPublicLoginDto } from './dto/auth-public-login.dto';

@Controller('auth-public')
export class AuthPublicController {
  constructor(private readonly authPublicService: AuthPublicService) {}

  @Post('login')
  async login(@Body() dto: AuthPublicLoginDto) {
    return this.authPublicService.loginPublic(dto);
  }
}
