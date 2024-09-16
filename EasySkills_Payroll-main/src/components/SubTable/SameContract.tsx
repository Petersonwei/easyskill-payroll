import { TableCell } from "@mui/material";
import React from "react";
import { ContractType } from "../../api/dictionary";
import Icon from "../Icon";
import { IncludedContract } from "../../api/types";

type SameContractProps = {
  contract: IncludedContract;
  contractType: ContractType | undefined;
  formatDate: (dateString: string) => string;
  isSameContract: boolean;
};

const SameContract: React.FC<SameContractProps> = ({ contract, contractType, formatDate, isSameContract }) => (
  <TableCell>
    {isSameContract ? (
      <span className="flex justify-start py-[10px] !pl-0">
        <Icon name="backup-arrow" width="16" height="16" />
      </span>
    ) : (
      <>
        <div>{contractType?.value}</div>
        <div className="pt-0.5 text-[#B0B0B0]">
          {formatDate(contract.attributes.startDate)} -{" "}
          {contract.attributes.endDate ? formatDate(contract.attributes.endDate) : "..."}
        </div>
      </>
    )}
  </TableCell>
);

export default SameContract;
