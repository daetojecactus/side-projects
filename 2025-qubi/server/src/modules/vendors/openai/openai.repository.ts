import { Injectable } from '@nestjs/common';
import { OpenAiApiClient } from './openai.client';
import { OpenAiResponse } from './openai.interface';

@Injectable()
export class OpenAiRepository {
  constructor(private readonly openAiApiClient: OpenAiApiClient) {}

  async send(input: string): Promise<OpenAiResponse> {
    const response = await this.openAiApiClient.instance.post<OpenAiResponse>(
      '/responses',
      {
        model: 'gpt-4o-mini',
        input,
        max_output_tokens: 1500,
      },
    );

    return response.data;
  }
}
