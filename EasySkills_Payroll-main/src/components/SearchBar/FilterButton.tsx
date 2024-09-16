import React from "react";
import Icon from "../Icon";

type FilterButtonProps = {
  filterType: string;
  isHovered: boolean;
  handleHovered: (isHovered: boolean) => void;
  handleFilterButtonClick: (filterType: string) => void;
  handleCloseFilterButton?: (filterType: string) => void;
  getIconAndLabel: (filterType: string) => JSX.Element;
};

const FilterButton: React.FC<FilterButtonProps> = ({
  filterType,
  handleFilterButtonClick,
  isHovered,
  handleHovered,
  getIconAndLabel,
  handleCloseFilterButton,
}) => {
  return (
    <button
      className="relative flex items-center gap-1 rounded-[4px] border border-[#E0E0E0] bg-[rgb(102,102,102)] p-2 hover:border-[#FEA500] hover:text-[#FEA500]"
      onMouseEnter={() => handleHovered(true)}
      onMouseLeave={() => handleHovered(false)}
      onClick={() => handleFilterButtonClick(filterType)}
    >
      {getIconAndLabel(filterType)}
      {isHovered && filterType !== "period" && handleCloseFilterButton && (
        <span
          className="absolute right-[-6px] top-[-6px] flex h-[12px] w-[12px] items-center justify-center rounded-full bg-[#C8C8C8]"
          onClick={(event) => {
            event.stopPropagation();
            handleCloseFilterButton(filterType);
          }}
        >
          <Icon name="close-button" width="6px" height="6px" color="black" />
        </span>
      )}
    </button>
  );
};

export default FilterButton;
