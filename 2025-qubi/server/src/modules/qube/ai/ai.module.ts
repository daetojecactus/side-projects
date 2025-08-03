import { Module } from '@nestjs/common';
import { AiRepository } from './ai.repository';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';

@Module({
  imports: [],
  providers: [AiRepository, AiService],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {}
