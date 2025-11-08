import { Module } from '@nestjs/common';
import { InputFilterService } from './input-filter.service';
import { StockImagesModule } from '../stock-images/stock-images.module';

@Module({
  imports: [StockImagesModule],
  providers: [InputFilterService],
  exports: [InputFilterService],
})
export class InputFilterModule {}
