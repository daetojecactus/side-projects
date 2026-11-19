import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class GeminiApiClient {
  private readonly client: AxiosInstance;

  constructor(configService: ConfigService) {
    this.client = axios.create({
      baseURL: configService.get<string>('GEMINI_API_URL'),
      headers: {
        'x-goog-api-key': configService.get<string>('GEMINI_API_TOKEN'),
        'content-type': 'application/json',
      },
    });

    axiosRetry(this.client, { retries: 3 });
  }

  get instance(): AxiosInstance {
    return this.client;
  }
}
