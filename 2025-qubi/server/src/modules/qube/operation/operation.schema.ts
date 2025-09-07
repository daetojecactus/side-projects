import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'operation' })
export class Operation {
  @Prop({ required: true, unique: true })
  code!: string;

  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  cost!: number;
}

export type OperationDocument = HydratedDocument<Operation>;
export const OperationSchema = SchemaFactory.createForClass(Operation);
