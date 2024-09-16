import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { WorkUnitType } from './work-unit-type.schema';
import { TimesReportDelivery, TimesReportProject } from '../dto/time-reports.dto';

export type WorkUnitDocument = HydratedDocument<WorkUnit>;

@Schema()
export class WorkUnit {
  @Prop({ type: String, required: true, unique: true })
  id: string;

  @Prop()
  startDate: string;

  @Prop({ type: Number })
  duration: number;

  @Prop()
  row: number;

  @Prop({ type: Types.ObjectId, ref: 'WorkUnitType' })
  workUnitType: WorkUnitType;

  @Prop({ type: Types.ObjectId, ref: 'TimesReportDelivery' })
  delivery?: TimesReportDelivery;

  @Prop({ type: Types.ObjectId, ref: 'TimesReportProject' })
  project?: TimesReportProject;
}

export const WorkUnitSchema = SchemaFactory.createForClass(WorkUnit);
