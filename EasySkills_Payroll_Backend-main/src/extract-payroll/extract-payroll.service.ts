import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExtractPayroll } from './schemas/extract-payroll.schema';
import * as dayjs from 'dayjs';
import { ApiResponse, IncludedItem } from 'src/payrolls/types/types';
import { ExtractPayrollDto } from './dto/extract-payroll.dto';

@Injectable()
export class ExtractPayrollService {
  private logger = new Logger(ExtractPayrollService.name);

  constructor(
    private httpService: HttpService,
    @InjectModel(ExtractPayroll.name) private extractPayrollModel: Model<ExtractPayroll>,
  ) {}

  async fetchExtractPayrollFromBoondManager(): Promise<{ data: ExtractPayrollDto[]; included: IncludedItem[] }> {
    let allExtractPayrolls: ExtractPayrollDto[] = [];
    let includedItems: IncludedItem[] = [];
    let currentPage = 1;
    const maxResults = 30;

    try {
      // this.logger.debug('Fetching extract payrolls from BoondManager...');
      const initialResponse = await this.httpService
        .get<ApiResponse<ExtractPayrollDto[]>>('/apps/extract-payroll/contracts', {
          params: { month: dayjs().format('YYYY-MM'), page: 1 },
        })
        .toPromise();

      const totalRows = initialResponse.data.meta.totals.rows;
      const totalPages = Math.ceil(totalRows / maxResults);

      allExtractPayrolls = [...allExtractPayrolls, ...initialResponse.data.data];
      includedItems = [...includedItems, ...initialResponse.data.included];

      for (currentPage = 2; currentPage <= totalPages; currentPage++) {
        const extractPayrollResponse = await this.httpService
          .get<ApiResponse<ExtractPayrollDto[]>>('/apps/extract-payroll/contracts', {
            params: { month: dayjs().format('YYYY-MM'), page: currentPage },
          })
          .toPromise();

        allExtractPayrolls = [...allExtractPayrolls, ...extractPayrollResponse.data.data];
        includedItems = [...includedItems, ...extractPayrollResponse.data.included];
      }

      return {
        data: allExtractPayrolls,
        included: includedItems,
      };
    } catch (error) {
      console.error(error);
      return { data: [], included: [] };
    }
  }

  async saveAllExtractPayrolls(extractPayrolls: ExtractPayroll[]) {
    // this.logger.debug(`Attempting to save ${extractPayrolls.length} extract payrolls`);
    const bulkOps = extractPayrolls.map((extractPayroll) => ({
      updateOne: {
        filter: { id: extractPayroll.id },
        update: {
          $set: {
            id: extractPayroll.id,
            type: extractPayroll.type,
            attributes: extractPayroll.attributes,
            relationships: extractPayroll.relationships,
            extractPayrollIncluded: extractPayroll.extractPayrollIncluded,
          },
        },
        upsert: true,
      },
    }));

    this.logger.debug(`Created ${bulkOps.length} bulk operations`);

    try {
      // this.logger.debug('Executing bulk write operation...');
      await this.extractPayrollModel.bulkWrite(bulkOps);
      // this.logger.debug(`Bulk write result: ${JSON.stringify(result)}`);
    } catch (error) {
      this.logger.error('Error in bulk write:', error);
    }
  }

  async find(month: string) {
    return this.extractPayrollModel.find().where('attributes.payrollTerm').equals(month);
  }
}
