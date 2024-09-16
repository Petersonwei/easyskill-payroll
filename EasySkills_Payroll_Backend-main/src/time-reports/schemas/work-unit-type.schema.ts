import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WorkUnitTypeDocument = HydratedDocument<WorkUnitType>;

@Schema()
export class WorkUnitType {
  @Prop({ type: Number, required: true, unique: true })
  reference: number;

  @Prop()
  activityType: string;

  @Prop()
  name: string;
}

export const WorkUnitTypeSchema = SchemaFactory.createForClass(WorkUnitType);
