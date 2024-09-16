import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DependsOnDataDocument = HydratedDocument<DependsOnData>;

@Schema()
export class DependsOnData {
  @Prop()
  id: string;

  @Prop()
  type: string;
}

@Schema()
export class DependsOn {
  @Prop({ type: DependsOnData })
  data: DependsOnData;
}

export const DependsOnDataSchema = SchemaFactory.createForClass(DependsOnData);
export const DependsOnSchema = SchemaFactory.createForClass(DependsOn);
