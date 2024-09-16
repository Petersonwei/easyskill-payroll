import React from "react";

type ModalSelectAllChangeButtonsProps = {
  onClick: (isSelectAll: boolean) => void;
};

const ModalSelectAllChangeButtons: React.FC<ModalSelectAllChangeButtonsProps> = ({ onClick }) => {
  return (
    <div className="my-2 flex w-[224px] justify-between text-[13px] text-[rgb(69,151,182)] ">
      <button className="h-4 hover:border-b hover:border-[rgb(69,151,182)]" onClick={() => onClick(true)}>
        Select all
      </button>
      <button className="h-4 hover:border-b hover:border-[rgb(69,151,182)]" onClick={() => onClick(false)}>
        Unselect all
      </button>
    </div>
  );
};

export default ModalSelectAllChangeButtons;
