import { Module } from '@nestjs/common';
import { ExtractPayrollService } from './extract-payroll.service';
import { ExtractPayrollController } from './extract-payroll.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ExtractPayroll, ExtractPayrollSchema } from './schemas/extract-payroll.schema';

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
    MongooseModule.forFeature([{ name: ExtractPayroll.name, schema: ExtractPayrollSchema }]),
  ],
  controllers: [ExtractPayrollController],
  providers: [ExtractPayrollService],
  exports: [ExtractPayrollService],
})
export class ExtractPayrollModule {}
