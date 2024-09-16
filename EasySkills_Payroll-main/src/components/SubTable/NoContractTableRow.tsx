import { styled, TableRow, TableCell } from "@mui/material";
import React from "react";
import { ContractType } from "../../api/dictionary";
import { IncludedContract } from "../../api/types";
import SingleContract from "../SingleContract";

type NoContractTableRowProps = {
  isLastChild: boolean;
  contract: IncludedContract;
  contractTypes: ContractType[];
  formatDate: (dateString: string) => string;
};

const NoContractTableRow: React.FC<NoContractTableRowProps> = ({
  isLastChild,
  contract,
  contractTypes,
  formatDate,
}) => {
  const StyledSubTableRow = styled(TableRow)({
    borderRight: "1px solid #F6F6F7",
    borderLeft: "1px solid #F6F6F7",
    borderBottom: isLastChild ? "none" : "1px solid #6A6A6B",
  });

  return (
    <StyledSubTableRow>
      <TableCell sx={{ width: "80px" }} padding="checkbox"></TableCell>
      <TableCell sx={{ width: "120px" }}></TableCell>
      <TableCell sx={{ width: "200px" }}></TableCell>
      <SingleContract
        contract={contract}
        contractType={contractTypes.find((contractType) => contractType.id === contract.attributes.typeOf)}
        formatDate={formatDate}
      />
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </StyledSubTableRow>
  );
};

export default NoContractTableRow;
