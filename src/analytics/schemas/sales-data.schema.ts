import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SalesData extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  category: string;

  @Prop()
  region: string;

  @Prop()
  salesRep: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const SalesDataSchema = SchemaFactory.createForClass(SalesData);