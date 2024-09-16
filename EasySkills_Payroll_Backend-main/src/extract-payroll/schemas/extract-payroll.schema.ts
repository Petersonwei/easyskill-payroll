import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ExtractPayrollAttributes } from './extract-payroll-attributes.schema';
import { ExtractPayrollRelationships } from './extract-payroll-relationships.schema';
import { IncludedItem } from 'src/payrolls/types/types';

export type ExtractPayrollDocument = HydratedDocument<ExtractPayroll>;

@Schema()
export class ExtractPayroll {
  @Prop({ required: true })
  id: string;

  @Prop({ enum: ['appextractpayrollcontract'] })
  type: string;

  @Prop({ type: Object })
  attributes: ExtractPayrollAttributes;

  @Prop({ type: Object })
  relationships: ExtractPayrollRelationships;

  @Prop()
  extractPayrollIncluded: IncludedItem[];
}

export const ExtractPayrollSchema = SchemaFactory.createForClass(ExtractPayroll);
