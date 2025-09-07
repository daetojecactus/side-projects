import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiRequestDto } from './ai.dto';
import { JwtPublicAuthGuard } from '../auth-public/jwt-public-auth.guard';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtPublicAuthGuard)
  @Post('request')
  async executeAiOperation(@Body() aiRequest: AiRequestDto, @Req() req) {
    return this.aiService.executeAiOperation(aiRequest, req.user.id);
  }
}
