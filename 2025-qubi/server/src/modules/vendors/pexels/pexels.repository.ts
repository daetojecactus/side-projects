import { Injectable } from '@nestjs/common';
import { PexelsApiClient } from './pexels.client';
import { PexelsSearchParams, PexelsSearchResponse } from './pexels.inreface';

@Injectable()
export class PexelsRepository {
  constructor(private readonly pexelsClient: PexelsApiClient) {}

  async search(params: PexelsSearchParams): Promise<PexelsSearchResponse> {
    const response = await this.pexelsClient.instance.get<PexelsSearchResponse>(
      '/search',
      {
        params: {
          query: params.query,
          per_page: params.per_page || 10,
          page: params.page || 1,
          ...(params.orientation && { orientation: params.orientation }),
          ...(params.size && { size: params.size }),
          ...(params.color && { color: params.color }),
          ...(params.locale && { locale: params.locale }),
        },
      },
    );

    return response.data;
  }
}
