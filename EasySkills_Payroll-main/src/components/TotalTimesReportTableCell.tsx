import React from "react";
import { useCalculateProductionTime } from "../queries/useCalculateProductionTime";
import { TableCell } from "@mui/material";
import { TimeReport } from "../api/time-report";

type TotalTimesReportTableCellProps = {
  timeReports: TimeReport[];
};

const TotalTimesReportTableCell: React.FC<TotalTimesReportTableCellProps> = ({ timeReports }) => {
  const realProductionTime = useCalculateProductionTime({ timeReports });

  return <TableCell style={{ textAlign: "center" }}>{`${realProductionTime.toFixed(2)}d`}</TableCell>;
};

export default TotalTimesReportTableCell;
