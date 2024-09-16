import React, { useState } from "react";
import { MenuItem, Select, TableCell, TextField, styled } from "@mui/material";
import { useCurrencies } from "../../store/useCurrenciesStore";

const StyledSelect = styled(Select)({
  color: "rgba(255, 255, 255, 0.8)",
  width: "60px",
  fontSize: "12px",
  "& .MuiSelect-select": {
    borderBottom: "1px solid white",
  },
  "& .MuiSelect-select:focus": {
    backgroundColor: "transparent",
    borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
  },
  "& .MuiSelect-icon": {
    color: "rgba(255, 255, 255, 0.8)",
  },
});

const StyledMenuItem = styled(MenuItem)({
  color: "rgba(255, 255, 255, 0.8)",
  backgroundColor: "#242425",
  fontSize: "12px",
  "&:hover": {
    backgroundColor: "#3a3a3a",
  },
  "&.Mui-selected": {
    backgroundColor: "#3a3a3a",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "#3a3a3a",
  },
});

const StyledTextField = styled(TextField)({
  width: "150px",
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

type PayRateTableCellProps = {
  dailyPayRate?: number;
  currencyId?: number;
  onChange: (change: { newCurrencyId?: number; dailyPayRate?: number }) => void;
};

const PayRateTableCell: React.FC<PayRateTableCellProps> = ({ dailyPayRate, currencyId, onChange }) => {
  const currencies = useCurrencies();
  const [inputDailyPayRate, setInputDailyPayRate] = useState(dailyPayRate ?? "");

  return (
    <TableCell sx={{ width: "200px", padding: "0 !important" }}>
      <div className="flex items-center pt-4">
        <StyledSelect
          variant="standard"
          value={currencyId ?? ""}
          style={{ marginRight: "10px" }}
          onChange={(event) => {
            const selectedCurrency = currencies.find((currency) => currency.id === (event.target.value as number));
            onChange({ newCurrencyId: selectedCurrency?.id });
          }}
          renderValue={(value) => currencies.find((currency) => currency.id === value)?.symbol}
        >
          {currencies.map((option) => (
            <StyledMenuItem key={option.id} value={option.id}>
              {option.value}
            </StyledMenuItem>
          ))}
        </StyledSelect>
        <StyledTextField
          label="Daily Pay Rate"
          type="number"
          value={inputDailyPayRate}
          onChange={(event) => {
            const newDailyPayRate = Number(event.target.value);
            setInputDailyPayRate(newDailyPayRate);
          }}
          onBlur={(event) => {
            const newDailyPayRate = Number(event.target.value);
            onChange({ dailyPayRate: newDailyPayRate });
          }}
        />
      </div>
    </TableCell>
  );
};

export default PayRateTableCell;
