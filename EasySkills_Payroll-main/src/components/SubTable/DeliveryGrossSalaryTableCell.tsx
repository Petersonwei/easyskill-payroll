import React, { useEffect, useMemo } from "react";
import { TableCell } from "@mui/material";
import { useCalculateProductionTime } from "../../queries/useCalculateProductionTime";
import { DeliveryProjectTimesReportTableCellProps } from "./DeliveryProjectTimesReportTableCell";
import { Salary } from "../../api/salary";
import { SalaryUtils } from "../../utils/SalaryUtils";

type DeliveryGrossSalaryTableCellProps = DeliveryProjectTimesReportTableCellProps & {
  currencySymbol?: string;
  salary?: Salary;
  salaryUtils: SalaryUtils;
  resourceId: string;
};

const DeliveryGrossSalaryTableCell: React.FC<DeliveryGrossSalaryTableCellProps> = ({
  projectItem,
  delivery,
  timeReports,
  currencySymbol,
  salary,
  salaryUtils,
  resourceId,
}) => {
  const deliveryProjectProductionTime = useCalculateProductionTime({
    timeReports,
    deliveryId: delivery.id,
    projectItemId: projectItem?.id,
  });

  const dailyPrice = salary?.dailyRate ?? 0;
  const deliveryGrossSalary = useMemo(
    () => (dailyPrice * deliveryProjectProductionTime).toFixed(2),
    [dailyPrice, deliveryProjectProductionTime],
  );

  useEffect(() => {
    salaryUtils.addGrossSalary(resourceId, +deliveryGrossSalary);
  }, [deliveryGrossSalary, salaryUtils, resourceId]);

  return <TableCell style={{ textAlign: "center" }}>{`${currencySymbol}${deliveryGrossSalary}`}</TableCell>;
};

export default DeliveryGrossSalaryTableCell;
