import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AccountStatus } from './account.interface';
import { autoIncrement } from 'mongoose-plugin-autoinc';

@Schema({ collection: 'account', timestamps: true })
export class Account {
  @Prop({ unique: true, immutable: true })
  id!: number;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true, default: 0 })
  balance!: number;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ required: false })
  telegram?: string;

  @Prop({ enum: AccountStatus, default: AccountStatus.ACTIVE })
  status!: AccountStatus;

  @Prop()
  deletedAt?: Date;
}

export type AccountDocument = HydratedDocument<Account>;
export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.plugin(autoIncrement, {
  model: 'Account',
  field: 'id',
  startAt: 1000,
  incrementBy: 1,
  unique: true,
});
