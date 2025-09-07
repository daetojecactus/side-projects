import { BadRequestException, Injectable } from '@nestjs/common';
import { AiRepository } from './ai.repository';
import { AiRequestDto } from './ai.dto';
import { OutputFilterService } from '../output-filter/output-filter.service';
import { OutputFilterMessages } from '../output-filter/constants/output-filter-messages';
import { BillingService } from '../billing/billing.service';

@Injectable()
export class AiService {
  constructor(
    private readonly aiRepository: AiRepository,
    private readonly billingService: BillingService,
    private readonly outputFilter: OutputFilterService,
  ) {}

  async executeAiOperation(aiRequest: AiRequestDto, accountId: number) {
    const response = await this.aiRepository.executeAiOperation(aiRequest);
    const rawOutput = response.output?.[0]?.content?.[0]?.text ?? '';

    if (!rawOutput) {
      throw new BadRequestException(
        OutputFilterMessages.OUTPUT_FILTER_NOT_VALID,
      );
    }

    await this.billingService.withdrawForOperation(accountId, 'ai_request');

    return await this.outputFilter.applyFilter(rawOutput);
  }
}
