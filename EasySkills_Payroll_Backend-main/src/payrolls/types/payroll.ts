import { ExtractPayrollDto } from 'src/extract-payroll/dto/extract-payroll.dto';
import { DeliveryDto } from '../../deliveries/dto/delivery.dto';
import { ExpensesDto } from '../../expenses/dto/expenses.dto';
import { ProjectDto } from '../../projects/dto/project.dto';
import { IncludedAdvantage, IncludedContract, IncludedItem, IncludedTimesreport } from './types';

export type Payslip = {
  id: string;
  firstName: string;
  lastName: string;
  isSelected: boolean;
  contracts: IncludedContract[];
  extractPayrolls: ExtractPayrollDto[];
  advantagePayList: (IncludedAdvantage | undefined)[];
  currentTimesreports: (IncludedTimesreport | undefined)[];
  deliveries: DeliveryDto[];
  projects: ProjectDto[];
  expenses: ExpensesDto[];
  deliveriesIncluded?: IncludedItem[];
  projectsIncluded?: IncludedItem[];
  salary?: Record<string, Record<string, { currencyId: number; price: number }>>;
};
