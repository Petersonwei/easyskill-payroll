import { Controller } from '@nestjs/common';
import { TimeReportsService } from './time-reports.service';

@Controller('time-reports')
export class TimeReportsController {
  constructor(private readonly timeReportsService: TimeReportsService) {}
}
