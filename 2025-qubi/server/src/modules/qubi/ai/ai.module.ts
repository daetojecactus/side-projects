import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { OpenAiModule } from 'src/modules/vendors/openai/openai.module';
import { AnthropicModule } from 'src/modules/vendors/anthropic/anthropic.module';
import { GeminiModule } from 'src/modules/vendors/gemini/gemini.module';
import { AuthCorpModule } from '../auth-corp/auth-corp.module';

@Module({
  imports: [OpenAiModule, AnthropicModule, GeminiModule, AuthCorpModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
