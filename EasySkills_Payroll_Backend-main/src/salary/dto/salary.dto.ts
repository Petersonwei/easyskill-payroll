export class SalaryDto {
  contractId: string;
  deliveryId: string;
  resourceId: string;
  currencyId?: number;
  dailyRate?: number;
  taxRate?: number;
}
