import { Injectable } from '@nestjs/common';
import { StockImagesService } from '../stock-images/stock-images.service';
import { WorkflowRequestDto } from '../workflow/dto/workflow-request.dto';

@Injectable()
export class InputFilterService {
  constructor(private readonly stockImagesService: StockImagesService) {}

  async applyFilter(input: WorkflowRequestDto) {
    const imageUrls = await this.stockImagesService.getImageUrls(input.image);

    return {
      text: `Создай полностью готовый адаптивный одностраничный сайт на HTML + CSS без использования JS "${input.prompt}".
ВАЖНО:
- Все стили должны быть встроены в тег <style> внутри <head>, НЕ используй внешние файлы CSS через <link>
- НЕ используй внешние шрифты через <link>, используй только стандартные шрифты (Arial, sans-serif и т.д.)
- Используй только следующие картинки:
${imageUrls.join('\n')}`,
      imageUrls,
    };
  }
}
