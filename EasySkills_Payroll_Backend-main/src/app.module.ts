import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ResourcesModule } from './resources/resources.module';
import { HttpModule } from '@nestjs/axios';
import { TaskModule } from './tasks/tasks.module';
import { AdministrativeModule } from './administrative/administrative.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { ProjectsModule } from './projects/projects.module';
import { ExpensesModule } from './expenses/expenses.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { TimeReportsModule } from './time-reports/time-reports.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ExtractPayrollModule } from './extract-payroll/extract-payroll.module';
import { PayrollsModule } from './payrolls/payrolls.module';
import { SalaryModule } from './salary/salary.module';

const username = 'deborah.chan@easy-skill.com';
const password = 'Sibeh7lazyset';
const token = btoa(`${username}:${password}`);
@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://ui.boondmanager.com/api',
      headers: {
        Authorization: `Basic ${token}`,
      },
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://deborahchan:Sibeh7lazyset@easyskillcluster.yjisigo.mongodb.net/'),
    PayrollsModule,
    ResourcesModule,
    TaskModule,
    AdministrativeModule,
    DeliveriesModule,
    ProjectsModule,
    ExpensesModule,
    TimesheetsModule,
    TimeReportsModule,
    DictionaryModule,
    ExtractPayrollModule,
    SalaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
