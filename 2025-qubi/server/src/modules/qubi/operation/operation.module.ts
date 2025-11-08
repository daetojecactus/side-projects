import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './operation.schema';
import { OperationService } from './operation.service';
import { OperationRepository } from './operation.repository';
import { OperationController } from './operation.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Operation.name, schema: OperationSchema },
    ]),
  ],
  providers: [OperationRepository, OperationService],
  controllers: [OperationController],
  exports: [OperationService],
})
export class OperationModule {}
