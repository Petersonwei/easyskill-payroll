import { Delivery } from "./delivery";
import { IncludedContract, IncludedItem } from "./types";
import { Project } from "./project";
import { Expenses } from "./expenses";
import { payrollRequest } from "./request";
import { Timesheet } from "./timesheet";
import { TimeReport } from "./time-report";

export type PayrollResponse = {
  data: Payslip[];
  total: number;
};

export type Payslip = {
  id: string;
  firstName: string;
  lastName: string;
  contracts: IncludedContract[];
  timesheets: Timesheet[];
  timeReports: TimeReport[];
  deliveries: Delivery[];
  deliveriesIncluded: IncludedItem[];
  projects: Project[];
  projectsIncluded: IncludedItem[];
  expenses: Expenses[];
};

type GetPayrollsParams = {
  isDetailedMode?: boolean;
  maxResults?: number;
  month: string;
  order?: "asc" | "desc";
  page?: number;
  saveSearch?: boolean;
  excludeManager?: boolean;
  resourceStates?: number[];
  resourceTypes?: number[];
  perimeterAgencies?: number[];
  perimeterDynamic?: string[];
  returnMoreData?: boolean | undefined;
  viewMode?: string;
};

export const getPayrolls = async (params: GetPayrollsParams) => {
  const response = await payrollRequest.get<PayrollResponse>("/payrolls", { params });
  return response.data;
};
