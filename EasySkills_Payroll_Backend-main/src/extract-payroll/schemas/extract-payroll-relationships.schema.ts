import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RelationshipTimesReports } from './relationship-times-reports.schema';
import { AdvantagesToPay } from './advantages-to-pay.schema';
import { AgencyRelationship } from './agency-relationship.schema';
import { DependsOn } from './depends-on.schema';
import { ExpensesReports } from './expenses-reports.schema';

export type ExtractPayrollRelationshipsDocument = HydratedDocument<ExtractPayrollRelationships>;

@Schema()
export class ExtractPayrollRelationships {
  @Prop({ type: Object })
  advantagesToPay: AdvantagesToPay;

  @Prop({ type: Object })
  agency: AgencyRelationship;

  @Prop({ type: Object })
  dependsOn: DependsOn;

  @Prop({ type: Object })
  timesReports: RelationshipTimesReports;

  @Prop({ type: Object })
  expensesReports: ExpensesReports;
}

export const ExtractPayrollRelationshipsSchema = SchemaFactory.createForClass(ExtractPayrollRelationships);
