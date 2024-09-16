import React from "react";
import { TableCell } from "@mui/material";
import { Payslip } from "../api/payrollService";

type OtherTableCellProps = {
  payslip: Payslip;
};

const AdvantagesTableCell: React.FC<OtherTableCellProps> = ({ payslip }) => (
  <TableCell>
    <ul>
      {/* TODO: */}
      {/* {payslip.advantagePayList.map((advantage, index) => (
        <li key={index}>{advantage?.attributes.advantageType.name}</li>
      ))} */}
    </ul>
  </TableCell>
);

export default AdvantagesTableCell;
