import React from "react";
import Icon from "./Icon";
import { BeatLoader } from "react-spinners";

type PayrollHeaderProps = {
  payrollSum: number;
  isLoading: boolean;
};

const PayrollHeader: React.FC<PayrollHeaderProps> = ({ payrollSum, isLoading }) => {
  return (
    <div className="flex items-center px-[15px] pt-2 ">
      <div className="ml-[15px] flex h-[62px] w-[60px] items-center justify-center">
        <Icon name="title" width="32px" height="32px" />
      </div>
      <span className="mr-2 pl-[15px] text-[32px]">Payroll</span>
      <span className="text-[20px]">{`(${payrollSum} data)`}</span>
      {isLoading && <BeatLoader color="#F97E06" size={13} className="ml-3" />}
    </div>
  );
};

export default PayrollHeader;
