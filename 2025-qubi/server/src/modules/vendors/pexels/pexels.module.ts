import { Module } from '@nestjs/common';
import { PexelsRepository } from './pexels.repository';
import { PexelsService } from './pexels.service';
import { PexelsApiClient } from './pexels.client';

@Module({
  imports: [],
  providers: [PexelsRepository, PexelsService, PexelsApiClient],
  exports: [PexelsService],
})
export class PexelsModule {}
