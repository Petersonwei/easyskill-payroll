import { TableCell } from "@mui/material";
import React from "react";
import { IncludedProject } from "../api/types";

type ProjectTableCellProps = {
  projectItem: IncludedProject | undefined;
};

const ProjectTableCell: React.FC<ProjectTableCellProps> = ({ projectItem }) => (
  <TableCell sx={{ maxWidth: "120px", overflow: "hidden" }}>
    <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[#E8E8E9]">{`${projectItem?.attributes.reference ?? ""}`}</div>
  </TableCell>
);

export default ProjectTableCell;
