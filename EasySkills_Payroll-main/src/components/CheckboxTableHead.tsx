import { TableCell } from "@mui/material";
import React from "react";
import Icon from "./Icon";
import clsx from "clsx";

type CheckboxTableHeadProps = {
  isAllChecked: boolean;
  isPartialChecked: boolean;
  onChangeAll: (isAllChecked: boolean) => void;
};

const CheckboxTableHead: React.FC<CheckboxTableHeadProps> = ({ isAllChecked, isPartialChecked, onChangeAll }) => {
  return (
    <TableCell sx={{ position: "relative", padding: "33px 45px !important" }} padding="checkbox">
      <div
        className={clsx(
          "absolute left-[50%] top-[50%] inline-block translate-x-[-50%] translate-y-[-50%] cursor-pointer",
          "before:absolute before:left-[50%] before:top-[50%] before:h-[15px] before:w-[15px] before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-[2px] before:border-[1px] before:border-[rgba(255,255,255,0.88)]",
        )}
        onClick={(event) => {
          event.stopPropagation();
          onChangeAll(!isAllChecked);
        }}
        role="checkbox"
        aria-checked={isAllChecked}
        tabIndex={0}
      >
        {isPartialChecked && (
          <div className="absolute left-1/2 top-1/2 h-0.5 w-[13px] -translate-x-1/2 -translate-y-1/2 bg-[#FEA500]"></div>
        )}
        {isAllChecked && <Icon name="checkbox-checked" color="#FEA500" />}
      </div>
    </TableCell>
  );
};

export default CheckboxTableHead;
