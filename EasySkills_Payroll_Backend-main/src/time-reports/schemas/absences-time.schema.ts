import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { WorkUnitTypeSchema, WorkUnitType } from './work-unit-type.schema';

export type AbsencesTimeDocument = HydratedDocument<AbsencesTime>;

@Schema()
export class AbsencesTime {
  @Prop()
  startDate: string;

  @Prop()
  duration: number;

  @Prop({ type: WorkUnitTypeSchema, required: true })
  workUnitType: WorkUnitType;
}

export const AbsencesTimeSchema = SchemaFactory.createForClass(AbsencesTime);
