import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })  // Automatically adds `createdAt` and `updatedAt` fields
export class Transaction extends Document {
  
  @Prop({ required: true })
  collect_id: string;

  @Prop({ required: true })
  school_id: string;

  @Prop({ required: true })
  gateway: string;

  @Prop({ required: true })
  order_amount: number;

  @Prop({ required: true })
  transaction_amount: number;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  custom_order_id: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
