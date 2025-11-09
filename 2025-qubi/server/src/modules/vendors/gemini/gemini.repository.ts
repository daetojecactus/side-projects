import { Injectable } from '@nestjs/common';
import { GeminiApiClient } from './gemini.client';
import { GeminiResponse } from './gemini.interface';

@Injectable()
export class GeminiRepository {
  constructor(private readonly geminiApiClient: GeminiApiClient) {}

  async send(input: string): Promise<GeminiResponse> {
    const response = await this.geminiApiClient.instance.post<GeminiResponse>(
      '/v1beta/models/gemini-2.0-flash-exp:generateContent',
      {
        contents: [
          {
            parts: [
              {
                text: input,
              },
            ],
          },
        ],
      },
    );

    return response.data;
  }
}
