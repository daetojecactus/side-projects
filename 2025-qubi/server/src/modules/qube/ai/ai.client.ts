import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class AiApiClient {
  private readonly client: AxiosInstance;

  constructor(configService: ConfigService) {
    this.client = axios.create({
      baseURL: configService.get<string>('AI_API_URL'),
      headers: {
        Authorization: `Bearer ${configService.get<string>('AI_API_TOKEN')}`,
        'Content-Type': 'application/json',
      },
    });

    axiosRetry(this.client, { retries: 3 });
  }

  get instance(): AxiosInstance {
    return this.client;
  }
}
