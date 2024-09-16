import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TimeReport } from './schemas/time-reports.schema';
import { TimeReportsDto } from './dto/time-reports.dto';
import { ApiResponse } from 'src/payrolls/types/types';
import { AxiosError } from 'axios';

@Injectable()
export class TimeReportsService {
  private readonly logger = new Logger(TimeReportsService.name);
  private readonly retryDelay = 2000; // 2秒
  private readonly maxRetries = 3;

  constructor(private readonly httpService: HttpService) {}

  async fetchPersonalTimeReportsFromBoondManager(ids: string[]): Promise<TimeReport[]> {
    const timeReports: TimeReport[] = [];

    for (const id of ids) {
      let attempt = 0;
      while (attempt < this.maxRetries) {
        try {
          this.logger.debug(`Fetching TimeReport with id: ${id}, attempt: ${attempt + 1}`);
          const response = await this.httpService
            .get<ApiResponse<TimeReportsDto>>(`/timesreports/${id}`, { timeout: 5000 })
            .toPromise();
          const timeReport = {
            id: response.data.data.id,
            type: response.data.data.type,
            term: response.data.data.attributes.term,
            creationDate: response.data.data.attributes.creationDate,
            updateDate: response.data.data.attributes.updateDate,
            informationComments: response.data.data.attributes.informationComments,
            workUnitRate: response.data.data.attributes.workUnitRate,
            closed: response.data.data.attributes.closed,
            state: response.data.data.attributes.state,
            regularTimes: response.data.data.attributes.regularTimes,
            absencesTime: response.data.data.attributes.absencesTimes,
          };
          timeReports.push(timeReport);
          break;
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.code === 'ECONNRESET') {
            this.logger.warn(`ECONNRESET error for TimeReport id: ${id}, retrying...`);
            attempt++;
            await this.delay(this.retryDelay);
          } else {
            this.logger.error(`Error fetching TimeReport with id ${id}:`, error.message);
            throw new Error(`Failed to fetch TimeReport: ${error.message}`);
          }
        }
      }
    }

    return timeReports;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
