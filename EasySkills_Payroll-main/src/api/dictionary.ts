import { payrollRequest } from "./request";

export type Currency = {
  id: number;
  iso: string;
  isEnabled: boolean;
  value: string;
  symbol: string;
};

export type ContractType = {
  id: number;
  value: string;
  isEnabled: boolean;
};

export type ProjectType = {
  id: number;
  value: string;
  isEnabled: boolean;
  mode: number;
  scheduleProductionTurnover: boolean;
  isInternal: boolean;
  activityType: "workUnit" | "day";
};

type Dictionary = {
  contracts: ContractType[];
  currency: Currency[];
  projects: ProjectType[];
};

export const getDictionary = () => payrollRequest.get<Dictionary>(`dictionary`);
