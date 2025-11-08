import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/modules/vendors/openai/openai.service';
import { AiMessages } from './constants/ai-messages';

@Injectable()
export class AiService {
  constructor(private readonly openAiService: OpenAiService) {}

  async send(input: string) {
    const response = await this.openAiService.send(input);
    const rawOutput = response.output?.[0]?.content?.[0]?.text ?? '';

    if (!rawOutput) {
      throw new BadRequestException(AiMessages.AI_OUTPUT_NOT_VALID);
    }

    return rawOutput;
  }
}
