import React from "react";
import { Delivery } from "../../api/delivery";
import { IncludedProject } from "../../api/types";
import { TableCell } from "@mui/material";
import { useCalculateProductionTime } from "../../queries/useCalculateProductionTime";
import { TimeReport } from "../../api/time-report";

export type DeliveryProjectTimesReportTableCellProps = {
  projectItem?: IncludedProject;
  delivery: Delivery;
  timeReports: TimeReport[];
};

const DeliveryProjectTimesReportTableCell: React.FC<DeliveryProjectTimesReportTableCellProps> = ({
  projectItem,
  delivery,
  timeReports,
}) => {
  const deliveryProjectProductionTime = useCalculateProductionTime({
    timeReports,
    deliveryId: delivery.id,
    projectItemId: projectItem?.id,
  });

  return <TableCell style={{ textAlign: "center" }}>{`${deliveryProjectProductionTime.toFixed(2)}d`}</TableCell>;
};

export default DeliveryProjectTimesReportTableCell;
