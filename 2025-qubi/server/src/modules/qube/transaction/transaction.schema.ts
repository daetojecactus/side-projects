import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TransactionType } from './transaction.interface';

@Schema({ collection: 'transaction', timestamps: true })
export class Transaction {
  @Prop({ required: true })
  accountId!: number;

  @Prop({ required: true, enum: TransactionType })
  type!: TransactionType;

  @Prop({ required: true })
  amount!: number;

  @Prop({ required: true })
  operationCode!: string;

  @Prop()
  description?: string;
}

export type TransactionDocument = HydratedDocument<Transaction>;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
