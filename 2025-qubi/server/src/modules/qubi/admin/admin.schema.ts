import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AdminStatus } from './admin.interface';
import { autoIncrement } from 'mongoose-plugin-autoinc';

@Schema({ collection: 'admin', timestamps: true })
export class Admin {
  @Prop({ unique: true, immutable: true })
  id!: number;

  @Prop({ required: true })
  login!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ enum: AdminStatus, default: AdminStatus.ACTIVE })
  status!: AdminStatus;

  @Prop()
  deletedAt?: Date;
}

export type AdminDocument = HydratedDocument<Admin>;
export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.plugin(autoIncrement, {
  model: 'Admin',
  field: 'id',
  startAt: 1000,
  incrementBy: 1,
  unique: true,
});
