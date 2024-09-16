export type DictionaryDto = {
  setting: Setting;
};

export type Setting = {
  currency: Currency[];
  typeOf: TypeDetail;
};

export type TypeDetail = {
  project: ProjectType[];
  contract: ContractType[];
};

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
  activityType: string;
};
