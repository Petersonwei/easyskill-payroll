import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectTypeDocument = HydratedDocument<ProjectType>;

@Schema()
export class ProjectType {
  @Prop({ required: true })
  id: number;

  @Prop()
  value: string;

  @Prop()
  isEnabled: boolean;

  @Prop()
  mode: number;

  @Prop()
  scheduleProductionTurnover: boolean;

  @Prop()
  isInternal: boolean;

  @Prop()
  activityType: string;
}

export const ProjectTypeSchema = SchemaFactory.createForClass(ProjectType);
