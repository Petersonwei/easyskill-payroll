import { payrollRequest } from "./request";

export type Salary = {
  id: string;
  resourceId: string;
  currencyId?: number;
  dailyRate?: number;
  taxRate?: number;
};

export type UpdateSalaryParams = {
  contractId: string;
  deliveryId: string;
  resourceId: string;
  currencyId?: number;
  dailyRate?: number;
  taxRate?: number;
};

export const getSalaries = async (): Promise<Salary[]> => {
  const response = await payrollRequest.get("/salary");
  return response.data;
};

export const updateSalary = async (params: UpdateSalaryParams) => {
  try {
    await payrollRequest.post("/salary", params);
    console.log("Salary updated successfully");
  } catch (error) {
    console.error("Failed to update salary:", error);
  }
};
