import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TimeReportsProjectDocument = HydratedDocument<TimeReportsProject>;

@Schema()
export class TimeReportsProject {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  reference: string;
}

export const TimeReportsProjectSchema = SchemaFactory.createForClass(TimeReportsProject);
