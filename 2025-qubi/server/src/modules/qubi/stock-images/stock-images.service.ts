import { Injectable } from '@nestjs/common';
import { PexelsService } from 'src/modules/vendors/pexels/pexels.service';

@Injectable()
export class StockImagesService {
  constructor(private readonly pexelsService: PexelsService) {}

  async getImages(input: string) {
    return await this.pexelsService.search({ query: input });
  }

  async getImageUrls(input: string): Promise<string[]> {
    const response = await this.getImages(input);
    return response.photos.map((photo) => photo.src.large);
  }
}
