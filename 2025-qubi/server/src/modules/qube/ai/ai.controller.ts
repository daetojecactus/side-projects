import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiRequestDto } from './ai.dto';
import { JwtPublicAuthGuard } from '../auth-public/jwt-public-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtPublicAuthGuard)
  @Post('request')
  async sendRequest(@Body() aiRequest: AiRequestDto) {
    return this.aiService.sendRequest(aiRequest);
  }
}
