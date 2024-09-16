import clsx from "clsx";
import React from "react";

type PageCellProps = {
  totalPages: number;
  isCurrentPage: boolean;
  cellPage: number;
  onPageChange: (page: number) => void;
};

const PageCell: React.FC<PageCellProps> = ({ totalPages, isCurrentPage, cellPage, onPageChange }) => {
  return (
    <div
      className={clsx(
        "flex h-[35px] w-[70px] cursor-pointer items-center text-[14px] hover:bg-[#BEBEBE]",
        `${isCurrentPage ? "bg-[#757575]" : "bg-[#4A4A4A]"}`,
      )}
      onClick={() => onPageChange(cellPage)}
    >
      <span className="pl-2.5 pr-3.5">
        {cellPage} / {totalPages}
      </span>
    </div>
  );
};

export default PageCell;
