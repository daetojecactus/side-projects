import { Injectable } from '@nestjs/common';
import { OmitTimestamps } from 'src/helpers/omit-timestamps';
import { OperationRepository } from './operation.repository';
import { Operation } from './operation.schema';
import { CreateOperationDto } from './dto/create-operation.dto';

@Injectable()
export class OperationService {
  constructor(private readonly operationRepository: OperationRepository) {}

  async findOne(filter: Partial<Operation> & { _id?: string }) {
    return this.operationRepository.findOne(filter);
  }

  async find(filter?: Partial<Operation>) {
    return this.operationRepository.find(filter);
  }

  create(dto: CreateOperationDto) {
    return this.operationRepository.create(dto);
  }

  async updateOne(
    filter: Partial<Operation> & { _id?: string },
    partialOperation: Partial<OmitTimestamps<Operation>>,
  ) {
    return this.operationRepository.updateOne(filter, partialOperation);
  }

  async deleteOne(
    filter: Partial<Operation> & { _id?: string },
  ): Promise<{ deletedCount: number }> {
    return this.operationRepository.deleteOne(filter);
  }
}
