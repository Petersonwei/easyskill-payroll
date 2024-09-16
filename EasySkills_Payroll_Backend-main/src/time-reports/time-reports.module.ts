import { Module } from '@nestjs/common';
import { TimeReportsService } from './time-reports.service';
import { TimeReportsController } from './time-reports.controller';
import { HttpModule } from '@nestjs/axios';

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
  ],
  controllers: [TimeReportsController],
  providers: [TimeReportsService],
  exports: [TimeReportsService],
})
export class TimeReportsModule {}
