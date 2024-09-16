import { payrollRequest } from "./request";
import { IncludedItem } from "./types";

export type ExtractPayrollRelationships = {
  advantagesToPay: AdvantagesToPay;
  agency: AgencyRelationship;
  dependsOn: DependsOn;
  timesReports: RelationshipTimesReports;
  expensesReports: ExpensesReports;
};

export type AdvantagesToPay = {
  data: { id?: string; type?: "advantage" }[];
};

export type AgencyRelationship = {
  data: { id: string; type: string };
};

export type DependsOn = {
  data: { id: string; type: string };
};

export type RelationshipTimesReports = {
  data: { id: string; type: "timesreport" }[];
};

export type ExpensesReports = {
  data: { id: string; type: string }[];
};

export type ExtractPayrollAttributes = {
  startDate: string;
  endDate: string;
  typeOf: number;
  payrollComments: string;
  payrollTerm: string;
  monthlySalary: number;
  currency: number;
  currencyAgency: number;
  exchangeRate: number;
  exchangeRateAgency: number;
  productionTimes: number;
  internalTimes: number;
  absencesTimes: number;
  expensesToPay: number;
  expensesAlreadyAdvanced: number;
  canGenerateAdvantages: boolean;
};

export type ExtractPayroll = {
  id: string;
  type: string;
  attributes: ExtractPayrollAttributes;
  relationships: ExtractPayrollRelationships;
  extractPayrollIncluded: IncludedItem[];
};

export const getExtractPayrolls = (month: string) =>
  payrollRequest.get<ExtractPayroll[]>("extract-payroll", { params: { month } });
