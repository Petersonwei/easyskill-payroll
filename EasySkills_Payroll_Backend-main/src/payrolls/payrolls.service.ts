import { Injectable, Logger } from '@nestjs/common';
import { GetPayrollDto } from './dto/get-payroll.dto';
import { ResourcesService } from 'src/resources/resources.service';
import { RespPayrollDto } from './dto/resp-payroll.dto';

@Injectable()
export class PayrollsService {
  private logger = new Logger(PayrollsService.name);

  constructor(private readonly resourcesService: ResourcesService) {}

  async getPayroll(getPayrollDto: GetPayrollDto) {
    try {
      const { resources, total } = await this.resourcesService.getResources(getPayrollDto);
      const data = resources.map<RespPayrollDto>((resource) => ({
        id: resource.id,
        firstName: resource.firstName,
        lastName: resource.lastName,
        contracts: resource.contracts,
        timesheets: resource.timesheets,
        timereports: resource.timeReports,
        deliveries: resource.deliveries,
        deliveriesIncluded: resource.deliveriesIncluded,
        projects: resource.projects,
        projectsIncluded: resource.projectsIncluded,
        expenses: resource.expenses,
      }));

      return {
        total,
        data,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
  // async findPayroll() {
  //   try {
  //       const payslips = resourcesResponse.data.data.map<Payslip>((resource) => {
  //       const payslipContracts = contractsResponse.data.data.filter(
  //         (contract) => contract.relationships.dependsOn.data.id === resource.id,
  //       );
  //       const advantagePayList = payslipContracts.map<IncludedAdvantage | undefined>((contract) => {
  //         const advantageIds = contract.relationships.advantagesToPay.data.map((item) => item.id);

  //         return contractsResponse.data.included.find(
  //           (includedItem) => includedItem.type === 'advantage' && advantageIds.includes(includedItem.id),
  //         ) as IncludedAdvantage;
  //       });

  //       const currentTimesreports = payslipContracts.flatMap((contract) => {
  //         const timesReportIds = contract.relationships.timesReports.data.map((item) => item.id);

  //         return contractsResponse.data.included.filter(
  //           (includedItem) => includedItem.type === 'timesreport' && timesReportIds.includes(includedItem.id),
  //         ) as IncludedTimesreport[];
  //       });

  //       const targetResourceRelated = resourcesRelated.find((resourceRelated) => resourceRelated.id === resource.id);

  //       const { deliveries, deliveriesIncluded, projects, projectsIncluded, expenses } = targetResourceRelated;

  //       return {
  //         id: resource.id,
  //         firstName: resource.attributes.firstName,
  //         lastName: resource.attributes.lastName,
  //         isSelected: false,
  //         contracts: payslipContracts,
  //         advantagePayList,
  //         currentTimesreports,
  //         deliveries,
  //         deliveriesIncluded,
  //         projects,
  //         projectsIncluded,
  //         expenses,
  //       };
  //     });

  //     return { payslips, totalItems };
  //   } catch (error) {
  //     console.error('Error fetching payroll data:', error);
  //     throw new HttpException('Failed to fetch payroll data', error.response?.status || 500);
  //   }

  //   }
  // }

  // async createContracts(contractsIncluded: IncludedItem[]) {
  //   for (const contractIncluded of contractsIncluded) {
  //     await this.administrativeModel
  //       .updateOne({ id: contractIncluded.id }, { $set: contractIncluded }, { upsert: true })
  //       .exec();
  //   }
  // }

  // async findAll(getPayrollDto: GetPayrollDto) {
  //   try {
  //     const resourcesRequest = this.httpService
  //       .get<ApiResponse<ResourceDto[]>>('/resources', {
  //         params: getPayrollDto,
  //       })
  //       .toPromise();

  //     const contractsRequest = this.httpService
  //       .get<ApiResponse<Contract[]>>('/apps/extract-payroll/contracts', {
  //         params: { ...getPayrollDto, maxResults: 500, page: 1 },
  //       })
  //       .toPromise();

  //     const [resourcesResponse, contractsResponse] = await Promise.all([resourcesRequest, contractsRequest]);

  //     const totalItems = resourcesResponse.data.meta.totals;

  //     const resourcesRelated = await Promise.all(
  //       resourcesResponse.data.data.map(async (resource) => {
  //         const [{ deliveries, included: deliveriesIncluded }, { projects, included: projectsIncluded }, { expenses }] =
  //           await Promise.all([
  //             this.findDeliveries(resource.id),
  //             this.findProjects(resource.id),
  //             this.findExpenses(resource.id),
  //           ]);

  //         return {
  //           id: resource.id,
  //           deliveries,
  //           deliveriesIncluded,
  //           projects,
  //           projectsIncluded,
  //           expenses,
  //         };
  //       }),
  //     );

  // }

  // async findProjects(id: string) {
  //   const projectsResponse = await this.httpService
  //     .get<ApiResponse<Project[]>>(`/resources/${id}/projects`, {
  //       params: {
  //         maxResults: 300,
  //         order: 'desc',
  //         page: 1,
  //         sort: 'updateDate',
  //       },
  //     })
  //     .toPromise();

  //   return { projects: projectsResponse?.data.data ?? [], included: projectsResponse?.data.included };
  // }

  // async findSettings() {
  //   const settingsResponse = await this.httpService
  //     .get<SettingApiResponse<SettingsData>>('/application/settings', {
  //       params: {
  //         ignoreStateSort: true,
  //       },
  //     })
  //     .toPromise();

  //   const contractTypes = settingsResponse.data?.data.setting.typeOf.contract ?? [];
  //   const currencyTypes = settingsResponse.data?.data.setting.currency ?? [];
  //   const projectTypes = settingsResponse.data?.data.setting.typeOf.project ?? [];

  //   return {
  //     contractTypes,
  //     currencyTypes,
  //     projectTypes,
  //   };
  // }

  // async findTimesheets(id: string) {
  //   const timesheetsResponse = await this.httpService
  //     .get<ApiResponse<Timesheet[]>>(`/resources/${id}/timesreports`, {
  //       params: {
  //         maxResults: 30,
  //         order: 'desc',
  //         page: 1,
  //         sort: 'updateDate',
  //       },
  //     })
  //     .toPromise();

  //   return { timesheets: timesheetsResponse?.data.data ?? [] };
  // }

  // async findTimeReports(ids: string[]) {
  //   const timeReports = await Promise.all(
  //     ids.map(async (id) => {
  //       const timeReportResponse = await this.httpService
  //         .get<ApiResponse<TimesReport>>(`/timesreports/${id}`)
  //         .toPromise();

  //       return timeReportResponse.data.data;
  //     }),
  //   );

  //   return timeReports;
  // }
}
