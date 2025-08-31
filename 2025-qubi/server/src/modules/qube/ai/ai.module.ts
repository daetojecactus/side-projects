import { Module } from '@nestjs/common';
import { AiRepository } from './ai.repository';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiApiClient } from './ai.client';

@Module({
  imports: [],
  controllers: [AiController],
  providers: [AiRepository, AiService, AiApiClient],
  exports: [AiService],
})
export class AiModule {}
