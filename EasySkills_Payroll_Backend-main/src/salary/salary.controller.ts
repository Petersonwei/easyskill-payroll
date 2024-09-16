import { Controller, Body, Post, Get } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryDto } from './dto/salary.dto';
import { Salary } from './schemas/salary.schema';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  async findAll(): Promise<Salary[]> {
    return this.salaryService.findAll();
  }

  @Post()
  update(@Body() updateSalaryDto: SalaryDto) {
    return this.salaryService.update(updateSalaryDto);
  }
}
