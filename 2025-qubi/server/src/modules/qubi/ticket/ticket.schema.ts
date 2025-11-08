import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';
import { TicketStatus } from './ticket.interface';

@Schema({ collection: 'ticket', timestamps: true })
export class Ticket {
  @Prop({ unique: true, immutable: true })
  id!: number;

  @Prop({ required: true })
  accountId!: number;

  @Prop({ enum: TicketStatus, default: TicketStatus.OPEN })
  status!: TicketStatus;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop()
  adminId?: number;
}

export type TicketDocument = HydratedDocument<Ticket>;
export const TicketSchema = SchemaFactory.createForClass(Ticket);

TicketSchema.plugin(autoIncrement, {
  model: 'Ticket',
  field: 'id',
  startAt: 1000,
  incrementBy: 1,
  unique: true,
});
