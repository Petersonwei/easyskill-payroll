import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AdministrativeService } from 'src/administrative/administrative.service';
import { DeliveriesService } from 'src/deliveries/deliveries.service';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { ExpensesService } from 'src/expenses/expenses.service';
import { ExtractPayrollService } from 'src/extract-payroll/extract-payroll.service';
import { ProjectsService } from 'src/projects/projects.service';
import { ResourcesService } from 'src/resources/resources.service';
import { Resource } from 'src/resources/schemas/resource.schema';
import { TimeReportsService } from 'src/time-reports/time-reports.service';
import { TimesheetsService } from 'src/timesheets/timesheets.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly resourcesService: ResourcesService,
    private readonly administrativeService: AdministrativeService,
    private readonly deliveriesService: DeliveriesService,
    private readonly projectsService: ProjectsService,
    private readonly expensesService: ExpensesService,
    private readonly timesheetsService: TimesheetsService,
    private readonly timeReportsService: TimeReportsService,
    private readonly dictionaryService: DictionaryService,
    private readonly extractPayrollService: ExtractPayrollService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleExtractPayrollCron() {
    // this.logger.debug('Extract Payroll Cron job started');

    try {
      // this.logger.debug('Fetching extract payrolls from BoondManager...');
      const { data: extractPayrollData, included: extractPayrollIncluded } =
        await this.extractPayrollService.fetchExtractPayrollFromBoondManager();

      if (extractPayrollData.length === 0 || extractPayrollIncluded.length === 0) {
        this.logger.warn('No extract payrolls fetched from BoondManager');
        return;
      }
      // this.logger.debug(`Fetched ${extractPayrollData.length} and ${extractPayrollIncluded.length} extract payrolls`);
      const extractPayrolls = extractPayrollData.map((item) => ({
        ...item,
        extractPayrollIncluded,
      }));
      await this.extractPayrollService.saveAllExtractPayrolls(extractPayrolls);
      // this.logger.debug('Extract payrolls saved successfully');
    } catch (error) {
      this.logger.error('Error in extract payroll cron job:', error.message);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleDictionaryCron() {
    this.logger.debug('Dictionary Cron job started');

    try {
      this.logger.debug('Fetching dictionary from BoondManager...');
      const dictionary = await this.dictionaryService.fetchDictionaryFromBoondManager();
      await this.dictionaryService.saveDictionary(dictionary);
      this.logger.debug('Dictionary saved successfully');
    } catch (error) {
      this.logger.error('Error in dictionary cron job:', error.message);
    }
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleResourcesCron() {
    this.logger.debug('Cron job started');

    try {
      // this.logger.debug('Fetching resources from BoondManager...');
      const resources = await this.resourcesService.fetchResourceFromBoondManager();

      if (resources.length === 0) {
        this.logger.warn('No resources fetched from BoondManager');
        return;
      }

      this.logger.debug(`Fetched ${resources.length} resources`);
      const resourcesToSave: Resource[] = [];
      // let processedId = 0;

      for (const { id, type, attributes } of resources) {
        // this.logger.debug(`Processing resource with id: ${id}`);
        // processedId++;

        // if (id === '17333') {
        //   this.logger.debug('Special handling for resource id 17333');
        // }

        const contracts = await this.administrativeService.findPersonalContracts(id);
        // this.logger.debug(`Fetched ${contracts.length} contracts for resource id: ${id}`);
        // if (id === '17333') {
        //   this.logger.debug(`Contracts for resource id 17333: ${JSON.stringify(contracts)}`);
        // }

        const { deliveries, included: deliveriesIncluded } = await this.deliveriesService.findDeliveries(id);
        // this.logger.debug(`Fetched ${deliveries.length} deliveries for resource id: ${id}`);
        // if (id === '17333') {
        //   this.logger.debug(`Deliveries for resource id 17333: ${JSON.stringify(deliveries)}`);
        // }

        const { projects, included: projectsIncluded } = await this.projectsService.findProjects(id);
        // this.logger.debug(`Fetched ${projects.length} projects for resource id: ${id}`);
        // if (id === '17333') {
        //   this.logger.debug(`Projects for resource id 17333: ${JSON.stringify(projects)}`);
        // }

        const { expenses } = await this.expensesService.findExpenses(id);
        // this.logger.debug(`Fetched ${expenses.length} expenses for resource id: ${id}`);
        // if (id === '17333') {
        //   this.logger.debug(`Expenses for resource id 17333: ${JSON.stringify(expenses)}`);
        // }

        const { timesheets } = await this.timesheetsService.findTimesheets(id);
        // this.logger.debug(`Fetched ${timesheets.length} timesheets for resource id: ${id}`);
        // if (id === '17333') {
        //   this.logger.debug(`Timesheets for resource id 17333: ${JSON.stringify(timesheets)}`);
        // }

        const timeReportIds = timesheets.map((timesheet) => timesheet.id);
        // this.logger.debug(`Extracted ${timeReportIds.length} time report ids from timesheets for resource id: ${id}`);

        this.logger.debug('Fetching time reports from BoondManager...');
        const timeReports = await this.timeReportsService.fetchPersonalTimeReportsFromBoondManager(timeReportIds);
        this.logger.debug(`Fetched ${timeReports.length} time reports from BoondManager`);

        const resource: Resource = {
          id,
          type,
          contracts,
          deliveries,
          deliveriesIncluded,
          projects,
          projectsIncluded,
          expenses,
          timesheets,
          timeReports,
          ...attributes,
        };
        resourcesToSave.push(resource);
        // this.logger.debug(`Processed ${processedId} resources so far`);
      }

      // this.logger.debug(`Prepared ${resourcesToSave.length} resources for saving`);
      if (resourcesToSave.length > 0) {
        await this.resourcesService.saveAllResources(resourcesToSave);
        // this.logger.debug('Resources saved successfully');
      } else {
        this.logger.warn('No resources to save');
      }

      // this.logger.debug('Resources Cron job completed');
    } catch (error) {
      this.logger.error('Error in cron job:', error.message);
    }
  }
}
