import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './operation.schema';
import { OperationService } from './operation.service';
import { OperationRepository } from './operation.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
  ],
  providers: [OperationRepository, OperationService],
  exports: [OperationService],
})
export class OperationModule {}
