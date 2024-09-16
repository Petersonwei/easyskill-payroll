import { Controller, Get, Query } from '@nestjs/common';
import { PayrollsService } from './payrolls.service';

import { GetPayrollDto } from './dto/get-payroll.dto';

@Controller('payrolls')
export class PayrollsController {
  constructor(private payrollsService: PayrollsService) {}

  @Get()
  findAll(@Query() getPayrollDto: GetPayrollDto) {
    return this.payrollsService.getPayroll(getPayrollDto);
  }

  // @Post('/rate')
  // setRate(@Body())
  // @Get('expenses/:id')
  // findExpenses(@Param('id') id: string) {
  //   return this.payrollsService.findExpenses(id);
  // }

  // @Get('settings')
  // findSettings() {
  //   return 'get success';
  // }
}
