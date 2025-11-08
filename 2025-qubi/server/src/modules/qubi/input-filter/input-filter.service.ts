import { Injectable } from '@nestjs/common';
import { StockImagesService } from '../stock-images/stock-images.service';
import { WorkflowRequestDto } from '../workflow/dto/workflow-request.dto';

@Injectable()
export class InputFilterService {
  constructor(private readonly stockImagesService: StockImagesService) {}

  async applyFilter(input: WorkflowRequestDto) {
    const imageUrls = await this.stockImagesService.getImageUrls(input.image);

    return {
      text: `Напиши сайт по ТЗ "${input.prompt}":\n Используй следующие картинки:\n${imageUrls.join('\n')}`,
      imageUrls,
    };
  }
}
