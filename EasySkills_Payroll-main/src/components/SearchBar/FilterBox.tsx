import React, { useMemo, useState } from "react";
import Icon from "../Icon";
import FilterButton from "./FilterButton";
import FilterModal from "./FilterModal";
import { FilterOptions, useDate, useFilters, useSetDate, useSetFilters } from "../../store/useSearchFilterStore";
import { PERIMETERS_GROUP, TYPE_GROUP } from "../../constants/filterGroups";
import dayjs from "dayjs";

type FilterBoxProps = {
  handlePageReset: (resetPage: number) => void;
};

const FilterBox: React.FC<FilterBoxProps> = ({ handlePageReset }) => {
  const [open, setOpen] = useState(false);
  const [perimeterHovered, setPerimeterHovered] = useState(false);
  const [typeHovered, setTypeHovered] = useState(false);
  const [periodHovered, setPeriodHovered] = useState(false);
  const [activeTabValue, setActiveTabValue] = useState(0);
  const filters = useFilters();
  const perimeterFilters = useMemo(
    () => [...filters.perimeterAgencies, ...filters.perimeterDynamic],
    [filters.perimeterAgencies, filters.perimeterDynamic],
  );
  const date = useDate();
  const setFilters = useSetFilters();
  const setDate = useSetDate();

  const handleClose = (event: any) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleCloseFilterButton = (filterType: string) => {
    switch (filterType) {
      case "perimeter":
        setFilters({ ...filters, perimeterAgencies: [], perimeterDynamic: [] });
        break;
      case "type":
        setFilters({ ...filters, resourceTypes: [] });
        break;
      default:
        break;
    }
  };

  const handleFilterButtonClick = (filterType: string) => {
    setOpen(true);
    switch (filterType) {
      case "perimeter":
        setActiveTabValue(0);
        break;
      case "type":
        setActiveTabValue(1);
        break;
      case "period":
        setActiveTabValue(2);
        break;
      default:
        setActiveTabValue(0);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setActiveTabValue(newValue);
  };

  const handleSave = (filters: FilterOptions, date: string) => {
    setFilters(filters);
    setDate(date);
    setOpen(false);
    handlePageReset(1);
  };

  const getPerimeterLabel = (id: string) => {
    const group = PERIMETERS_GROUP.find((group) => group.columns.some((column) => column.id === id));
    if (group) {
      const column = group.columns.find((column) => column.id === id);
      return column?.label || id;
    }
    return id;
  };

  const getTypeLabel = (id: string) => {
    const column = TYPE_GROUP.columns.find((column) => column.id === id);
    return column?.label || id;
  };

  const getIconAndLabel = (filterType: string) => {
    switch (filterType) {
      case "perimeter":
        return (
          <div className="flex items-center gap-1">
            <Icon width="14px" height="14px" name="perimeter" color="#E0E0E0" isHovered={perimeterHovered} />
            <span className="text-[13px]">
              {perimeterFilters.length === 1
                ? getPerimeterLabel(perimeterFilters[0])
                : `${perimeterFilters.length} Perimeters`}
            </span>
          </div>
        );
      case "type":
        return (
          <div className="flex items-center gap-1">
            <Icon width="14px" height="14px" name="type" color="#E0E0E0" isHovered={typeHovered} />
            <span className="text-[13px]">
              {filters.resourceTypes.length === 1
                ? getTypeLabel(filters.resourceTypes[0])
                : `${filters.resourceTypes.length} Types`}
            </span>
          </div>
        );
      case "period":
        return (
          <div className="flex items-center gap-1">
            <Icon width="14px" height="14px" name="period" color="#E0E0E0" isHovered={periodHovered} />
            <span className="text-[13px]">{`${dayjs(date).format("MMMM YYYY")}`}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1">
            <Icon width="14px" height="14px" name="period" color="#E0E0E0" isHovered={periodHovered} />
            <span className="text-[13px]">{`${dayjs(date).format("MMMM YYYY")}`}</span>
          </div>
        );
    }
  };

  return (
    <div className="mt-1 flex flex-col items-start">
      <div className="text-[12px] text-[rgba(255,255,255,0.7)]">Filters</div>
      <div className="flex items-center justify-center">
        <span
          className="mr-2 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            setOpen(true);
          }}
        >
          <Icon name="filter" width="16px" height="16px" color="#fff" />
        </span>
        <div className="flex gap-1">
          {perimeterFilters.length > 0 && (
            <FilterButton
              getIconAndLabel={getIconAndLabel}
              isHovered={perimeterHovered}
              handleHovered={setPerimeterHovered}
              filterType="perimeter"
              handleFilterButtonClick={handleFilterButtonClick}
              handleCloseFilterButton={handleCloseFilterButton}
            />
          )}
          {filters.resourceTypes.length > 0 && (
            <FilterButton
              getIconAndLabel={getIconAndLabel}
              isHovered={typeHovered}
              handleHovered={setTypeHovered}
              filterType="type"
              handleFilterButtonClick={handleFilterButtonClick}
              handleCloseFilterButton={handleCloseFilterButton}
            />
          )}
          <FilterButton
            getIconAndLabel={getIconAndLabel}
            isHovered={periodHovered}
            handleHovered={setPeriodHovered}
            filterType="period"
            handleFilterButtonClick={handleFilterButtonClick}
          />
        </div>
      </div>

      <FilterModal
        handleChange={handleChange}
        activeTabValue={activeTabValue}
        open={open}
        filters={filters}
        date={date}
        handleSave={handleSave}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FilterBox;
