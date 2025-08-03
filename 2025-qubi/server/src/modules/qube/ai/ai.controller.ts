import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiRequestDto } from './ai.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('request')
  async sendRequest(@Body() aiRequest: AiRequestDto) {
    return this.aiService.sendRequest(aiRequest);
  }
}
