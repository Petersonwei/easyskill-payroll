import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TimeReportsDeliveryDocument = HydratedDocument<TimeReportsDelivery>;

@Schema()
export class TimeReportsDelivery {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  title: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;
}

export const TimeReportsDeliverySchema = SchemaFactory.createForClass(TimeReportsDelivery);
