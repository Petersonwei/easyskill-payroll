import React from "react";
import Icon from "../Icon";

type BottomBarProps = {
  handleClose: (event: any) => void;
  handleSave: (event: any) => void;
  handleReset: (event: any) => void;
};

const BottomBar: React.FC<BottomBarProps> = ({ handleClose, handleSave, handleReset }) => {
  return (
    <div className="flex w-full items-center justify-end gap-2 rounded-b-md border-t border-[#6A6A6B] bg-[#474748] px-4 py-2">
      <button
        className="z-10 mr-9 h-[15px] text-[12px] text-[rgb(69,151,182)] hover:border-b hover:border-[rgb(69,151,182)]"
        onClick={handleReset}
      >
        Reset filters
      </button>
      <button
        className="z-10 min-w-14 cursor-pointer rounded-[3px] border-[1px] bg-[#666666] px-2 py-1.5 text-[12px] text-[#ECECEC] shadow-sm hover:border-[#FEA500] hover:text-[#FEA500]"
        onClick={handleClose}
      >
        Cancel
      </button>
      <button
        className="z-10 flex min-w-10 cursor-pointer items-center gap-1 rounded-[3px] border-[1px] border-[#FEA500] bg-[#FEA500] px-2 py-1.5 text-[12px] text-[#ffffff] shadow-sm hover:bg-[#FFC133]"
        onClick={handleSave}
      >
        <span>
          <Icon name="search" width="12px" height="12px" color="#ffffff" />
        </span>
        Apply
      </button>
    </div>
  );
};

export default BottomBar;
