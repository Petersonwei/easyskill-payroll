import { TimeReport } from 'src/time-reports/schemas/time-reports.schema';
import { TimesheetDto } from 'src/timesheets/dto/timesheet.dto';
import { IncludedContract, IncludedItem } from '../types/types';
import { DeliveryDto } from 'src/deliveries/dto/delivery.dto';
import { ProjectDto } from 'src/projects/dto/project.dto';
import { ExpensesDto } from 'src/expenses/dto/expenses.dto';

export class RespPayrollDto {
  id: string;
  firstName: string;
  lastName: string;
  contracts: IncludedContract[];
  timesheets: TimesheetDto[];
  timereports: TimeReport[];
  deliveries: DeliveryDto[];
  deliveriesIncluded: IncludedItem[];
  projects: ProjectDto[];
  projectsIncluded: IncludedItem[];
  expenses: ExpensesDto[];
}
