import { Controller, Get, Query } from '@nestjs/common';
import { ExtractPayrollService } from './extract-payroll.service';

@Controller('extract-payroll')
export class ExtractPayrollController {
  constructor(private readonly extractPayrollService: ExtractPayrollService) {}

  @Get()
  find(@Query('month') month: string) {
    return this.extractPayrollService.find(month);
  }
}
