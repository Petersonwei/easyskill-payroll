import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbsencesTimeSchema, AbsencesTime } from './absences-time.schema';
import { WorkUnit, WorkUnitSchema } from './work-unit.schema';

export type TimeReportDocument = HydratedDocument<TimeReport>;

@Schema()
export class TimeReport {
  @Prop({ required: true })
  id: string;

  @Prop()
  type: string;

  @Prop()
  term: string;

  @Prop()
  creationDate: string;

  @Prop()
  updateDate: string;

  @Prop()
  informationComments: string;

  @Prop()
  workUnitRate: number;

  @Prop()
  closed: boolean;

  @Prop()
  state: string;

  @Prop({ type: [WorkUnitSchema] })
  regularTimes: WorkUnit[];

  @Prop({ type: [AbsencesTimeSchema] })
  absencesTime: AbsencesTime[];
}

export const TimeReportSchema = SchemaFactory.createForClass(TimeReport);
