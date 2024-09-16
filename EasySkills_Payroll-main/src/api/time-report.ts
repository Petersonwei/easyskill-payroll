export type TimeReport = {
  id: string;
  type: string;
  term: string;
  creationDate: string;
  updateDate: string;
  informationComments: string;
  workUnitRate: number;
  closed: boolean;
  state: string;
  regularTimes: WorkUnit[];
  absencesTime: AbsencesTime[];
};

export type WorkUnit = {
  id: string;
  startDate: string;
  duration: number;
  row: number;
  workUnitType: WorkUnitType;
  delivery?: TimesReportDelivery;
  project?: TimesReportProject;
};

export type WorkUnitType = {
  reference: number;
  activityType: string;
  name: string;
};

export type TimesReportProject = {
  id: string;
  reference: string;
};

export type TimesReportDelivery = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};

export type AbsencesTime = {
  startDate: string;
  duration: number;
  workUnitType: WorkUnitType;
};
