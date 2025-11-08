import { Injectable } from '@nestjs/common';
import { PexelsRepository } from './pexels.repository';
import { PexelsSearchParams } from './pexels.inreface';

@Injectable()
export class PexelsService {
  constructor(private readonly pexelsRepository: PexelsRepository) {}

  async search(params: PexelsSearchParams) {
    return await this.pexelsRepository.search(params);
  }
}
