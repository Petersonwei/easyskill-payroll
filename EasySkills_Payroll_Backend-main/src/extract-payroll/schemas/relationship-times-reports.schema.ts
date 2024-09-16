import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RelationshipTimesReportsDocument = HydratedDocument<RelationshipTimesReports>;

@Schema()
export class RelationshipTimesReports {
  @Prop({ type: [{ id: String, type: { type: String, enum: ['timesreport'] } }], default: [] })
  data: { id: string; type: 'timesreport' }[];
}

export const RelationshipTimesReportsSchema = SchemaFactory.createForClass(RelationshipTimesReports);
