import { styled, TableRow, TableCell } from "@mui/material";
import React from "react";
import { Delivery } from "../../api/delivery";
import { IncludedProject } from "../../api/types";
import DeliveryProjectTimesReportTableCell from "./DeliveryProjectTimesReportTableCell";
import SingleDelivery from "../SingleDelivery";
import { TimeReport } from "../../api/time-report";

type NoDeliveryTableRowProps = {
  delivery: Delivery;
  projectItem: IncludedProject | undefined;
  timeReports: TimeReport[];
  isLastChild: boolean;
};

const NoDeliveryTableRow: React.FC<NoDeliveryTableRowProps> = ({ delivery, projectItem, timeReports, isLastChild }) => {
  const StyledSubTableRow = styled(TableRow)({
    borderRight: "1px solid #F6F6F7",
    borderLeft: "1px solid #F6F6F7",
    borderBottom: isLastChild ? "none" : "1px solid #6A6A6B",
  });

  return (
    <StyledSubTableRow>
      <TableCell sx={{ width: "80px" }} padding="checkbox"></TableCell>
      <TableCell sx={{ width: "120px" }}></TableCell>
      <TableCell sx={{ width: "200px" }}></TableCell>
      <TableCell sx={{ width: "200px" }}></TableCell>
      <TableCell sx={{ width: "200px" }}></TableCell>
      <SingleDelivery delivery={delivery} />
      <DeliveryProjectTimesReportTableCell projectItem={projectItem} timeReports={timeReports} delivery={delivery} />
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </StyledSubTableRow>
  );
};

export default NoDeliveryTableRow;
