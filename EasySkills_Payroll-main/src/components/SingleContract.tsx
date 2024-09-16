import { TableCell } from "@mui/material";
import React from "react";
import { ContractType } from "../api/dictionary";
import { IncludedContract } from "../api/types";

type SingleContractProps = {
  contract: IncludedContract;
  contractType: ContractType | undefined;
  formatDate: (dateString: string) => string;
};

const SingleContract: React.FC<SingleContractProps> = ({ contract, contractType, formatDate }) => (
  <TableCell>
    <div>{contractType?.value}</div>
    <div className="pt-0.5 text-[#B0B0B0]">
      {formatDate(contract.attributes.startDate)} -{" "}
      {contract.attributes.endDate ? formatDate(contract.attributes.endDate) : "..."}
    </div>
  </TableCell>
);

export default SingleContract;
