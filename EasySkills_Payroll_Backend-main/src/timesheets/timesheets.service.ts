import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/payrolls/types/types';
import { TimesheetDto } from './dto/timesheet.dto';

@Injectable()
export class TimesheetsService {
  constructor(private readonly httpService: HttpService) {}

  async findTimesheets(id: string) {
    try {
      const timesheetsResponse = await this.httpService
        .get<ApiResponse<TimesheetDto[]>>(`/resources/${id}/timesreports`)
        .toPromise();

      return { timesheets: timesheetsResponse?.data.data ?? [] };
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn(`Access denied for timesheets of resource ${id}`);
        return { timesheets: [] };
      }
      console.error('Error fetching timesheets:', error);
      throw new Error(`Failed to fetch timesheets for resource ${id}: ${error.message}`);
    }
  }
}
