import { Injectable } from '@nestjs/common';
import { AiApiClient } from './ai.factory';
import { AiRequestDto } from './ai.dto';

@Injectable()
export class AiRepository {
  async sendRequest(aiRequest: AiRequestDto): Promise<any> {
    const response = await AiApiClient.post('/request', {
      input: aiRequest,
    });

    return response.data;
  }
}
