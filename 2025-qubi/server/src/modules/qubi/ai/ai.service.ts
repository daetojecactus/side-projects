import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenAiService } from 'src/modules/vendors/openai/openai.service';
import { AiMessages } from './constants/ai-messages';
import { AnthropicService } from 'src/modules/vendors/anthropic/anthropic.service';
import { GeminiService } from 'src/modules/vendors/gemini/gemini.service';

@Injectable()
export class AiService {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly anthropicService: AnthropicService,
    private readonly geminiService: GeminiService,
  ) {}

  async sendOpenAi(input: string) {
    const startTime = Date.now();
    console.log('OpenAI: Отправка запроса...');

    const response = await this.openAiService.send(input);
    const rawOutput = response.output?.[0]?.content?.[0]?.text ?? '';

    const duration = Date.now() - startTime;
    console.log(
      `OpenAI: Ответ получен за ${duration}ms (${(duration / 1000).toFixed(2)}s)`,
    );

    if (!rawOutput) {
      throw new BadRequestException(AiMessages.AI_OUTPUT_NOT_VALID);
    }

    return rawOutput;
  }

  async sendAnthropic(input: string) {
    const startTime = Date.now();
    console.log('Anthropic: Отправка запроса...');

    const response = await this.anthropicService.send(input);
    console.log('Anthropic raw response:', response);
    const rawOutput = response.content?.[0]?.text ?? '';

    const duration = Date.now() - startTime;
    console.log(
      `Anthropic: Ответ получен за ${duration}ms (${(duration / 1000).toFixed(2)}s)`,
    );

    if (!rawOutput) {
      throw new BadRequestException(AiMessages.AI_OUTPUT_NOT_VALID);
    }

    return rawOutput;
  }

  async sendGemini(input: string) {
    const startTime = Date.now();
    console.log('Gemini: Отправка запроса...');

    const response = await this.geminiService.send(input);
    const rawOutput = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    const duration = Date.now() - startTime;
    console.log(
      `Gemini: Ответ получен за ${duration}ms (${(duration / 1000).toFixed(2)}s)`,
    );

    if (!rawOutput) {
      throw new BadRequestException(AiMessages.AI_OUTPUT_NOT_VALID);
    }

    return rawOutput;
  }
}
