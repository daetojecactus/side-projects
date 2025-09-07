import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Operation, OperationDocument } from './operation.schema';
import { OmitTimestamps } from 'src/helpers/omit-timestamps';
import { OperationMessages } from './constants/operation-messages';

@Injectable()
export class OperationRepository {
  constructor(
    @InjectModel(Operation.name)
    private readonly operationModel: Model<OperationDocument>,
  ) {}

  async findOne(filter: Partial<Operation> & { _id?: string }) {
    return await this.operationModel.findOne(filter);
  }

  async find(filter?: Partial<Operation>) {
    return await this.operationModel.find(filter ?? {});
  }

  async create(operation: OmitTimestamps<Operation>) {
    return await this.operationModel.create(operation);
  }

  async updateOne(
    filter: Partial<Operation> & { _id?: string },
    partialOperation: Partial<OmitTimestamps<Operation>>,
  ) {
    const operation = await this.operationModel.findOneAndUpdate(
      filter,
      partialOperation,
      {
        new: true,
      },
    );
    if (!operation) {
      throw new NotFoundException(OperationMessages.OPERATION_NOT_FOUND);
    }
    return operation;
  }

  async deleteOne(
    filter: Partial<Operation> & { _id?: string },
  ): Promise<{ deletedCount: number }> {
    const result = await this.operationModel.deleteOne(filter);
    return { deletedCount: result.deletedCount ?? 0 };
  }
}
