import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class PexelsApiClient {
  private readonly client: AxiosInstance;

  constructor(configService: ConfigService) {
    this.client = axios.create({
      baseURL: configService.get<string>('PEXELS_API_URL'),
      headers: {
        Authorization: configService.get<string>('PEXELS_API_TOKEN'),
      },
    });

    axiosRetry(this.client, { retries: 3 });
  }

  get instance(): AxiosInstance {
    return this.client;
  }
}
