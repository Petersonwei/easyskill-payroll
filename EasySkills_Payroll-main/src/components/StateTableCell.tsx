import React, { useState } from "react";
import { TableCell } from "@mui/material";
import Icon from "./Icon";
import { Expenses } from "../api/expenses";
import { Timesheet } from "../api/timesheet";

type StateTableCellProps = {
  currentMonthItems: Expenses[] | Timesheet[];
  isValidated: boolean;
};

const StateTableCell: React.FC<StateTableCellProps> = ({ currentMonthItems, isValidated }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (isValidated: boolean) => {
    if (currentMonthItems.length < 1) {
      return <Icon name="plus" isHovered={isHovered} />;
    }
    if (isValidated) {
      return <Icon name="validated" color="#1ABC9D" isHovered={isHovered} />;
    } else {
      return <Icon name="funnel" isHovered={isHovered} />;
    }
  };

  return (
    <TableCell align="center">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "100%" }}>
        <div
          className="flex h-[28px] w-[28px] flex-row items-center justify-center rounded-full bg-[#666666]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {getIcon(isValidated)}
        </div>
      </div>
    </TableCell>
  );
};

export default StateTableCell;
