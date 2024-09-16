export class SalaryUtils {
  private totalSalaries: Record<string, number> = {};
  private netSalaries: Record<string, number> = {};

  addGrossSalary(resourceId: string, grossSalary: number) {
    if (this.totalSalaries[resourceId] !== grossSalary) {
      this.totalSalaries[resourceId] = grossSalary;
    }
  }

  setNetSalary(resourceId: string, netSalary: number) {
    if (this.netSalaries[resourceId] !== netSalary) {
      this.netSalaries[resourceId] = netSalary;
    }
  }

  getTotalSalary(resourceId: string) {
    return this.totalSalaries[resourceId] || 0;
  }

  getNetSalary(resourceId: string) {
    return this.netSalaries[resourceId] || 0;
  }
}
