import React from "react";
import { TableCell } from "@mui/material";
import SingleContract from "./SingleContract";
import { ContractType } from "../api/dictionary";
import { IncludedContract } from "../api/types";

type ContractsTableCellProps = {
  activeContracts: IncludedContract[];
  contractTypes: ContractType[];
  formatDate: (dateString: string) => string;
};

const ContractsTableCell: React.FC<ContractsTableCellProps> = ({ activeContracts, contractTypes, formatDate }) => {
  if (activeContracts.length === 0) return <TableCell></TableCell>;
  if (activeContracts.length === 1) {
    const [contract] = activeContracts;
    const contractType = contractTypes.find((contractType) => contractType.id === contract.attributes.typeOf);

    return <SingleContract contract={contract} contractType={contractType} formatDate={formatDate} />;
  }
  if (activeContracts.length > 1) {
    return (
      <TableCell>
        <div>{`${activeContracts.length} Contracts`}</div>
      </TableCell>
    );
  }
};

export default ContractsTableCell;
