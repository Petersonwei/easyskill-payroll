import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpensesReportsDocument = HydratedDocument<ExpensesReports>;

@Schema()
export class ExpensesReportDataItem {
  @Prop()
  id: string;

  @Prop()
  type: string;
}

@Schema()
export class ExpensesReports {
  @Prop({ type: [ExpensesReportDataItem], default: [] })
  data: ExpensesReportDataItem[];
}

export const ExpensesReportDataItemSchema = SchemaFactory.createForClass(ExpensesReportDataItem);
export const ExpensesReportsSchema = SchemaFactory.createForClass(ExpensesReports);
