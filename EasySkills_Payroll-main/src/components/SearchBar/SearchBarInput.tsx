import { styled, TextField } from "@mui/material";
import React from "react";
import Icon from "../Icon";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    width: "300px",
    color: "#D3D3D3",
    paddingLeft: "20px",
    paddingBottom: "1px",
  },
  "& .MuiInput-underline": {
    "&:hover::before": {
      borderBottom: "1px solid #6A6A6B !important",
    },
    "&::before": {
      borderBottom: "1px solid #6A6A6B",
    },
    "&::after": {
      borderBottom: "1px solid #FEA500",
    },
  },
  "& .MuiFormLabel-root": {
    "&&.Mui-focused": {
      fontSize: "12px",
      marginLeft: "0 !important",
    },
  },
});

type SearchBarInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const SearchBarInput: React.FC<SearchBarInputProps> = ({ onChange, value }) => {
  return (
    <div className="relative pl-[20px]">
      <span className="absolute left-[20px] top-[23px] h-[24px] w-[19px]">
        <Icon name="search" width="16px" height="16px" />
      </span>
      <StyledTextField
        id="standard-basic"
        label={<div className=" ml-[25px] text-[12px] text-[rgba(255,255,255,0.7)]">Keywords</div>}
        variant="standard"
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchBarInput;
