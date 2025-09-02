import { Injectable } from '@nestjs/common';
import { AiRepository } from './ai.repository';
import { AiRequestDto } from './ai.dto';
import { OutputFilterService } from '../output-filter/output-filter.service';

@Injectable()
export class AiService {
  constructor(
    private readonly aiRepository: AiRepository,
    private readonly outputFilter: OutputFilterService,
  ) {}

  async sendRequest(aiRequest: AiRequestDto) {
    const response = await this.aiRepository.sendRequest(aiRequest);

    const rawOutput = response.output?.[0]?.content?.[0]?.text ?? '';

    if (!rawOutput) {
      throw new Error('Error');
    }

    return await this.outputFilter.applyFilter(rawOutput);
  }
}
