export type ExtractPayrollDto = {
  id: string;
  type: 'appextractpayrollcontract';
  attributes: Attributes;
  relationships: Relationships;
};

export type Attributes = {
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

export type Relationships = {
  advantagesToPay: AdvantagesToPay;
  agency: AgencyRelationship;
  dependsOn: DependsOn;
  timesReports: TimesReports;
  expensesReports: ExpensesReports;
};

export type AdvantagesToPay = {
  data: [
    {
      id?: string;
      type?: 'advantage';
    },
  ];
};

export type AgencyRelationship = {
  data: AgencyData;
};

export type AgencyData = {
  id: string;
  type: string;
};

export type DependsOn = {
  data: DependsOnData;
};

export type DependsOnData = {
  id: string;
  type: string;
};

export type TimesReports = {
  data: [
    {
      id: string;
      type: 'timesreport';
    },
  ];
};

export type ExpensesReports = {
  data: ExpensesReportDataItem[];
};

export type ExpensesReportDataItem = {
  id: string;
  type: string;
};
