// import { Injectable } from '@nestjs/common';
// import { OutputFilterService } from '../output-filter/output-filter.service';
// import { BillingService } from '../billing/billing.service';
// import { AiService } from '../ai/ai.service';
// import { InputFilterService } from '../input-filter/input-filter.service';
// import { WorkflowRequestDto } from './dto/workflow-request.dto';

// @Injectable()
// export class WorkflowService {
//   constructor(
//     private readonly inputFilter: InputFilterService,
//     private readonly aiService: AiService,
//     private readonly billingService: BillingService,
//     private readonly outputFilter: OutputFilterService,
//   ) {}

//   async execute(input: WorkflowRequestDto, accountId: number) {
//     const filteredInput = await this.inputFilter.applyFilter(input);

//     const response = await this.aiService.send(filteredInput);

//     await this.billingService.withdrawForOperation(accountId, 'ai_request');

//     return await this.outputFilter.applyFilter(response);
//   }
// }

import { Injectable } from '@nestjs/common';
import { OutputFilterService } from '../output-filter/output-filter.service';
import { AiService } from '../ai/ai.service';
import { InputFilterService } from '../input-filter/input-filter.service';
import { WorkflowRequestDto } from './dto/workflow-request.dto';

@Injectable()
export class WorkflowService {
  constructor(
    private readonly inputFilter: InputFilterService,
    private readonly aiService: AiService,
    private readonly outputFilter: OutputFilterService,
  ) {}

  async execute(input: WorkflowRequestDto) {
    const filteredInput = await this.inputFilter.applyFilter(input);
    // const response = await this.aiService.sendOpenAi(filteredInput.text);
    // const response = await this.aiService.sendAnthropic(filteredInput.text);
    const response = await this.aiService.sendGemini(filteredInput.text);

    return await this.outputFilter.applyFilter(
      response,
      filteredInput.imageUrls,
    );
  }
}
