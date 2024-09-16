import React from "react";
import Icon from "./Icon";
import { TableCell, TableRow } from "@mui/material";

type EmptyTableRowProps = {
  handleReset: (event: any) => void;
};

const EmptyTableRow: React.FC<EmptyTableRowProps> = ({ handleReset }) => {
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <div className="mt-11 flex min-h-screen flex-col items-center gap-2 text-[#E4E4E4]">
          <Icon name="fail-search" height="50px" width="50px" />
          <span className="!text-[19px] font-[700]">No data found</span>
          <span className="mb-5 !text-[13px] !font-[400]">Either none exists, or the filters are too restrictive.</span>
          <span className="flex items-center gap-1 !font-[400]">
            <Icon name="reset" color="rgb(69,151,182)" stroke="rgb(69,151,182)" strokeWidth="40" />
            <button
              className="h-4 !text-[14px] text-[rgb(69,151,182)] hover:border-b hover:border-[rgb(69,151,182)]"
              onClick={handleReset}
            >
              Reset filters
            </button>
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTableRow;
