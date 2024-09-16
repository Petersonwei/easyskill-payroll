import { TimeReport } from "../api/time-report";
import { useMemo } from "react";

type TimesReportOptions = {
  timeReports?: TimeReport[];
  deliveryId?: string;
  projectItemId?: string;
};

export const useCalculateProductionTime = ({ timeReports = [], deliveryId, projectItemId }: TimesReportOptions) => {
  const deliveryProjectProductionTime = useMemo(
    () =>
      timeReports.reduce((totalDuration, timesReport) => {
        const totalRegularTimes = timesReport.regularTimes.reduce((subTotal, regularTime) => {
          const isProductionTime = regularTime.workUnitType.activityType === "production";

          // if we have deliveryId and projectItemId, we calculate single subtable's prodution time, otherwise we calculate total prodution time
          if (deliveryId && projectItemId) {
            const isSubTableProductionTime =
              isProductionTime && regularTime.delivery?.id === deliveryId && regularTime.project?.id === projectItemId;

            return isSubTableProductionTime ? subTotal + regularTime.duration : subTotal;
          }

          return isProductionTime ? subTotal + regularTime.duration : subTotal;
        }, 0);
        return totalDuration + totalRegularTimes;
      }, 0),
    [deliveryId, projectItemId, timeReports],
  );

  return deliveryProjectProductionTime;
};
