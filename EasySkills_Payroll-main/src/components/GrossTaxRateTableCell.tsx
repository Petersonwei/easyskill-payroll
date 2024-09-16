import React from "react";
import { IncludedContract } from "../api/types";
import { TableCell } from "@mui/material";

type GrossTaxRateTableCellProps = {
  contract: IncludedContract;
  isSameCurrencyType: boolean;
  currencySymbol: string;
};

const GrossTaxRateTableCell: React.FC<GrossTaxRateTableCellProps> = ({
  contract,
  isSameCurrencyType,
  currencySymbol,
}) => {
  if (!contract) return <TableCell></TableCell>;
  if (isSameCurrencyType) {
    const { contractAverageDailyCost, exchangeRateAgency } = contract.attributes;
    return (
      <TableCell>
        {`${exchangeRateAgency} / ${currencySymbol}${(contractAverageDailyCost / exchangeRateAgency).toFixed(2)}`}
      </TableCell>
    );
  }
  return <TableCell>Multiple Rates</TableCell>;
};

export default GrossTaxRateTableCell;
