import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiResponse } from 'src/payrolls/types/types';
import { ExpensesDto } from './dto/expenses.dto';

@Injectable()
export class ExpensesService {
  constructor(private httpService: HttpService) {}
  async findExpenses(id: string) {
    try {
      const expensesResponse = await this.httpService
        .get<ApiResponse<ExpensesDto[]>>(`/resources/${id}/expensesreports`)
        .toPromise();

      return { expenses: expensesResponse?.data.data ?? [] };
    } catch (error) {
      if (error.response?.status === 403) {
        console.warn(`Access denied for expenses of resource ${id}`);
        return { expenses: [] };
      }
      console.error('Error fetching expenses:', error);
      throw new Error(`Failed to fetch expenses for resource ${id}: ${error.message}`);
    }
  }
}
