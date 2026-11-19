import { Injectable } from '@nestjs/common';
import { GeminiRepository } from './gemini.repository';

@Injectable()
export class GeminiService {
  constructor(private readonly geminiRepository: GeminiRepository) {}

  async send(input: string) {
    return await this.geminiRepository.send(input);
  }
}
