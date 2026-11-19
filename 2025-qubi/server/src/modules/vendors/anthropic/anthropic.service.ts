import { Injectable } from '@nestjs/common';
import { AnthropicRepository } from './anthropic.repository';

@Injectable()
export class AnthropicService {
  constructor(private readonly anthropicRepository: AnthropicRepository) {}

  async send(input: string) {
    return await this.anthropicRepository.send(input);
  }
}
