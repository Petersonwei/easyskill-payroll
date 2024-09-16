import { TableCell } from "@mui/material";
import React from "react";
import { IncludedCompany, IncludedContact, IncludedItem, IncludedProject } from "../api/types";
import { Project } from "../api/project";

type ClientTableCellProps = {
  projectItem: IncludedProject | undefined;
  projects: Project[];
  projectsIncluded: IncludedItem[] | undefined;
};

const ClientTableCell: React.FC<ClientTableCellProps> = ({ projectItem, projects, projectsIncluded }) => {
  const project = projects.find((project) => projectItem?.id === project.id);

  const companyItem = projectsIncluded?.find(
    (includedItem) => includedItem.type === "company" && project?.relationships.company.data.id === includedItem.id,
  ) as IncludedCompany;

  const contactItem = projectsIncluded?.find(
    (includedItem) => includedItem.type === "contact" && project?.relationships.contact.data.id === includedItem.id,
  ) as IncludedContact;

  return (
    <TableCell>
      <div className="text-[#E8E8E9]">{companyItem?.attributes.name ?? ""}</div>
      <div className="text-[#B0B0B0]">{`${contactItem?.attributes.firstName ?? ""} ${contactItem?.attributes.lastName ?? ""}`}</div>
    </TableCell>
  );
};

export default ClientTableCell;
