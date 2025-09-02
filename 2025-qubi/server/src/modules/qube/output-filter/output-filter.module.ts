import { Module } from '@nestjs/common';
import { OutputFilterService } from './output-filter.service';

@Module({
  imports: [],
  controllers: [],
  providers: [OutputFilterService],
  exports: [OutputFilterService],
})
export class OutputFilterModule {}
