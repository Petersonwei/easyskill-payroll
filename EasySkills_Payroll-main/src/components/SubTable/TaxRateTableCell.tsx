import React, { useState } from "react";
import { TableCell, TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  width: "100px",
  "& .MuiInputBase-root": {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "12px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.8)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.8)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.8)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "12px",
  },
});

type TaxRateTableCellProps = {
  taxRate?: number;
  onChange: (newTaxRate: number) => void;
};

const TaxRateTableCell: React.FC<TaxRateTableCellProps> = ({ taxRate, onChange }) => {
  const [inputTaxRate, setInputTaxRate] = useState(taxRate ?? "");

  return (
    <TableCell sx={{ width: "200px", padding: "0 !important" }}>
      <div className="flex items-center pl-2 pt-4">
        <StyledTextField
          label="Tax Rate (%)"
          type="number"
          value={inputTaxRate}
          onChange={(event) => setInputTaxRate(Number(event.target.value))}
          onBlur={(event) => onChange(Number(event.target.value))}
        />
      </div>
    </TableCell>
  );
};

export default TaxRateTableCell;
