import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { OpenAiModule } from 'src/modules/vendors/openai/openai.module';

@Module({
  imports: [OpenAiModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
