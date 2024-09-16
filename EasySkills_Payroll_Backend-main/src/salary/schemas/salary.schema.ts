import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SalaryDocument = HydratedDocument<Salary>;

@Schema()
export class Salary {
  @Prop({ required: true })
  id: string;

  @Prop()
  currencyId: number;

  @Prop()
  dailyRate: number;

  @Prop({ required: true })
  resourceId: string;

  @Prop()
  taxRate: number;
}

export const SalarySchema = SchemaFactory.createForClass(Salary);
