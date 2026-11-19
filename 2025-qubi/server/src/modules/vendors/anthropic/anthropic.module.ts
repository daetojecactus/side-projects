import { Module } from '@nestjs/common';
import { AnthropicRepository } from './anthropic.repository';
import { AnthropicService } from './anthropic.service';
import { AnthropicApiClient } from './anthropic.client';

@Module({
  imports: [],
  providers: [AnthropicRepository, AnthropicService, AnthropicApiClient],
  exports: [AnthropicService],
})
export class AnthropicModule {}
