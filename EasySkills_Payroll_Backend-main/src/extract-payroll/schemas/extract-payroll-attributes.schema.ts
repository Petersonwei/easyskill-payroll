import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExtractPayrollAttributesDocument = HydratedDocument<ExtractPayrollAttributes>;

@Schema()
export class ExtractPayrollAttributes {
  @Prop()
  startDate: string;

  @Prop()
  endDate: string;

  @Prop()
  typeOf: number;

  @Prop()
  payrollComments: string;

  @Prop()
  payrollTerm: string;

  @Prop()
  monthlySalary: number;

  @Prop()
  currency: number;

  @Prop()
  currencyAgency: number;

  @Prop()
  exchangeRate: number;

  @Prop()
  exchangeRateAgency: number;

  @Prop()
  productionTimes: number;

  @Prop()
  internalTimes: number;

  @Prop()
  absencesTimes: number;

  @Prop()
  expensesToPay: number;

  @Prop()
  expensesAlreadyAdvanced: number;

  @Prop()
  canGenerateAdvantages: boolean;
}

export const ExtractPayrollAttributesSchema = SchemaFactory.createForClass(ExtractPayrollAttributes);
