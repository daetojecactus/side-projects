import { Module } from '@nestjs/common';
import { GeminiRepository } from './gemini.repository';
import { GeminiService } from './gemini.service';
import { GeminiApiClient } from './gemini.client';

@Module({
  imports: [],
  providers: [GeminiRepository, GeminiService, GeminiApiClient],
  exports: [GeminiService],
})
export class GeminiModule {}
