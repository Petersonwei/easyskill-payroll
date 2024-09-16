import React, { useMemo, useState } from "react";
import Icon from "./Icon";
import { TableCell, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import NoteModal from "./NoteModal";
import { ExtractPayroll } from "../api/extract-payroll";
import { Payslip } from "../api/payrollService";

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#242425",
    color: "#E4E4E4",
    border: "1px solid #E4E4E4",
  },
}));

type NoteTableCellProps = {
  extraPayrolls?: ExtractPayroll[];
  payslip: Payslip;
};

const NoteTableCell: React.FC<NoteTableCellProps> = ({ extraPayrolls = [], payslip }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = (event: any) => {
    event.stopPropagation();
    setOpen(false);
  };

  const commentList = useMemo(
    () =>
      extraPayrolls
        .filter((extraPayroll) => extraPayroll.relationships.dependsOn.data.id === payslip.id)
        .map((extraPayroll) => extraPayroll.attributes.payrollComments.trim())
        .filter((comment) => comment.length > 0),
    [extraPayrolls, payslip.id],
  );
  const hasComment = commentList.length > 0;

  return (
    <TableCell style={{ textAlign: "left", display: "relative" }}>
      {hasComment ? (
        <StyledTooltip
          title={commentList.map((comment) => (
            <div key={comment}>{comment}</div>
          ))}
          placement="top"
        >
          <button
            onClick={(event) => {
              event.stopPropagation();
              setOpen(true);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Icon name="chat-bubble" isHovered={isHovered} />
          </button>
        </StyledTooltip>
      ) : (
        <button
          onClick={(event) => {
            event.stopPropagation();
            setOpen(true);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon name="plus" isHovered={isHovered} />
        </button>
      )}
      <NoteModal
        open={open}
        handleClose={handleClose}
        hasComment={hasComment}
        payslip={payslip}
        commentList={commentList}
      />
    </TableCell>
  );
};

export default NoteTableCell;
