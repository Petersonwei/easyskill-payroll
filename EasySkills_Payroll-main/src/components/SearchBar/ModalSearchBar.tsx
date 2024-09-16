import React from "react";
import Icon from "../Icon";
import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "#D3D3D3",
    width: "204px",
    height: "16px",
    marginTop: "10px",
    padding: "0",
    paddingLeft: "20px",
    paddingBottom: "5px",
  },
  "& .MuiInput-underline": {
    ":hover::before": {
      borderBottom: "1px solid #6A6A6B",
    },
    "&::before": {
      borderBottomColor: "#6A6A6B",
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

type ModalSearchBarProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalSearchBar: React.FC<ModalSearchBarProps> = ({ handleChange }) => {
  return (
    <>
      <div className="relative">
        <span className="absolute bottom-0.5 left-0 h-[16px] w-[19px]">
          <Icon name="search" width="12px" height="12px" color="white" />
        </span>
        <StyledTextField id="standard-basic" variant="standard" onChange={handleChange} />
      </div>
    </>
  );
};

export default ModalSearchBar;
