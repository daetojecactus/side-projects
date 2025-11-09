import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class AnthropicApiClient {
  private readonly client: AxiosInstance;

  constructor(configService: ConfigService) {
    this.client = axios.create({
      baseURL: configService.get<string>('ANTHROPIC_API_URL'),
      headers: {
        'x-api-key': configService.get<string>('ANTHROPIC_API_TOKEN'),
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
    });

    axiosRetry(this.client, { retries: 3 });
  }

  get instance(): AxiosInstance {
    return this.client;
  }
}
