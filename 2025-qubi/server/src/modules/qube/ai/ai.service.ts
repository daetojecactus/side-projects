import { Injectable } from '@nestjs/common';
import { AiRepository } from './ai.repository';
import { AiRequestDto } from './ai.dto';

@Injectable()
export class AiService {
  constructor(private readonly aiRepository: AiRepository) {}

  async sendRequest(aiRequest: AiRequestDto) {
    return await this.aiRepository.sendRequest(aiRequest);
  }
}
