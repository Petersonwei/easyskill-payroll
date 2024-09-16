import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AgencyRelationshipDocument = HydratedDocument<AgencyRelationship>;

@Schema()
export class AgencyData {
  @Prop()
  id: string;

  @Prop()
  type: string;
}

@Schema()
export class AgencyRelationship {
  @Prop({ type: AgencyData })
  data: AgencyData;
}

export const AgencyDataSchema = SchemaFactory.createForClass(AgencyData);
export const AgencyRelationshipSchema = SchemaFactory.createForClass(AgencyRelationship);
