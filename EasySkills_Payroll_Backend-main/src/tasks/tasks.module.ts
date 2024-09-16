import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ResourcesModule } from 'src/resources/resources.module';
import { AdministrativeModule } from 'src/administrative/administrative.module';
import { DeliveriesModule } from 'src/deliveries/deliveries.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { TimesheetsModule } from 'src/timesheets/timesheets.module';
import { TimeReportsModule } from 'src/time-reports/time-reports.module';
import { ExtractPayrollModule } from 'src/extract-payroll/extract-payroll.module';
import { DictionaryModule } from 'src/dictionary/dictionary.module';

@Module({
  imports: [
    ResourcesModule,
    AdministrativeModule,
    DeliveriesModule,
    ProjectsModule,
    ExpensesModule,
    TimesheetsModule,
    TimeReportsModule,
    DictionaryModule,
    ExtractPayrollModule,
  ],
  providers: [TasksService],
})
export class TaskModule {}
