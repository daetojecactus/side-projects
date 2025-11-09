import { Injectable } from '@nestjs/common';
import { AnthropicApiClient } from './anthropic.client';
import { AnthropicResponse } from './anthropic.interface';

@Injectable()
export class AnthropicRepository {
  constructor(private readonly anthropicApiClient: AnthropicApiClient) {}

  async send(input: string): Promise<AnthropicResponse> {
    const response =
      await this.anthropicApiClient.instance.post<AnthropicResponse>(
        '/messages',
        {
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: input,
            },
          ],
        },
      );

    return response.data;
  }
}
