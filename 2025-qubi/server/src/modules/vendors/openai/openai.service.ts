import { Injectable } from '@nestjs/common';
import { OpenAiRepository } from './openai.repository';

@Injectable()
export class OpenAiService {
  constructor(private readonly openAiRepository: OpenAiRepository) {}

  async send(input: string) {
    return await this.openAiRepository.send(input);
  }
}
