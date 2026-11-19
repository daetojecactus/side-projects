import { Module } from '@nestjs/common';
import { PexelsModule } from 'src/modules/vendors/pexels/pexels.module';
import { StockImagesService } from './stock-images.service';

@Module({
  imports: [PexelsModule],
  providers: [StockImagesService],
  exports: [StockImagesService],
})
export class StockImagesModule {}
