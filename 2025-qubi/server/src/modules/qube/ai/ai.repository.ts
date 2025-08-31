// ai.repository.ts
import { Injectable } from '@nestjs/common';
import { AiRequestDto } from './ai.dto';
import { AiApiClient } from './ai.client';

@Injectable()
export class AiRepository {
  constructor(private readonly aiApiClient: AiApiClient) {}

  async sendRequest(aiRequest: AiRequestDto): Promise<any> {
    const response = await this.aiApiClient.instance.post('/responses', {
      model: 'gpt-4o-mini',
      input: aiRequest.prompt,
      max_output_tokens: 1500,
    });

    return response.data;
  }
}
