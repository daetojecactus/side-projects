import { Module } from '@nestjs/common';
import { OpenAiRepository } from './openai.repository';
import { OpenAiService } from './openai.service';
import { OpenAiApiClient } from './openai.client';

@Module({
  imports: [],
  providers: [OpenAiRepository, OpenAiService, OpenAiApiClient],
  exports: [OpenAiService],
})
export class OpenAiModule {}
