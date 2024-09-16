import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon";
import clsx from "clsx";
import PageCell from "./PageCell";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollOffset = (totalPages - currentPage) * 35;
      scrollContainerRef.current.scrollTop = scrollOffset;
    }
  }, [isOpen, currentPage, totalPages]);

  if (totalItems <= itemsPerPage) {
    return null;
  }

  const handlePageChange = (page: number) => {
    onPageChange(page);
    setOpen(false);
  };

  return (
    <div className="mt-9 flex h-[70px] w-screen items-center justify-center gap-1 pb-[35px]">
      <button
        disabled={currentPage <= 1}
        className={clsx("mr-2 flex h-[12px] items-center gap-1 text-[12px]", {
          "cursor-not-allowed text-[rgba(255,255,255,0.4)]": currentPage <= 1,
          "text-[rgb(69,151,182)] hover:border-b hover:border-[rgb(69,151,182)]": currentPage > 1,
        })}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
        <Icon
          name="back-arrow"
          width="6px"
          height="6px"
          color={currentPage <= 1 ? "rgba(255,255,255,0.4)" : "rgb(69,151,182)"}
        />
      </button>
      <div
        className="relative flex h-[35px] w-[70px] cursor-pointer items-center rounded-[4px] border border-[rgb(106,106,107)] text-[14px] hover:border-[#FEA500]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setOpen(!isOpen)}
      >
        <div
          className={clsx("absolute bottom-[34px] left-[-1px] max-h-[350px] overflow-y-auto")}
          ref={scrollContainerRef}
        >
          {isOpen &&
            Array.from({ length: totalPages }, (_, i) => (
              <PageCell
                key={i}
                totalPages={totalPages}
                cellPage={totalPages - i}
                isCurrentPage={totalPages - i === currentPage}
                onPageChange={onPageChange}
              />
            ))}
        </div>
        <span className="pl-2">
          {currentPage} / {totalPages}
        </span>
        <button className="absolute right-0.5">
          <Icon
            name="pull-down-button"
            color="#DADADA"
            isHovered={isHovered}
            hoverColor="#FEA500"
            width="14px"
            height="14px"
            rotate={isOpen ? 180 : 0}
          />
        </button>
      </div>
      <button
        disabled={currentPage === totalPages}
        className={clsx("ml-2 flex h-[12px] items-center gap-1 text-[12px]", {
          "cursor-not-allowed text-[rgba(255,255,255,0.4)]": currentPage === totalPages,
          "text-[rgb(69,151,182)] hover:border-b hover:border-[rgb(69,151,182)]": currentPage < totalPages,
        })}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <Icon
          name="front-arrow"
          width="6px"
          height="6px"
          color={currentPage === totalPages ? "rgba(255,255,255,0.4)" : "rgb(69,151,182)"}
        />
        Next
      </button>
    </div>
  );
};

export default Pagination;
