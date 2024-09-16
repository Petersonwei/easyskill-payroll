import React, { useMemo, useState } from "react";
import ModalSearchBar from "./ModalSearchBar";
import Checkbox from "../Checkbox";
import { AGENCIES_GROUP, DYNAMIC_GROUP, FilterGroupId } from "../../constants/filterGroups";
import ModalSelectAllChangeButtons from "./ModalSelectAllChangeButtons";
import { FilterOptions } from "../../store/useSearchFilterStore";

type PerimeterState = Pick<FilterOptions, FilterGroupId.Dynamic | FilterGroupId.Agencies>;

type PerimeterPanelProps = {
  selectOptions: FilterOptions;
  onChange: (groupId: FilterGroupId, columnId: string, isChecked: boolean) => void;
  onSelectAllPerimeter: (state: PerimeterState) => void;
};

const PerimeterPanel: React.FC<PerimeterPanelProps> = ({ selectOptions, onChange, onSelectAllPerimeter }) => {
  const [searchKeyWords, setSearchKeyWords] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= 2) {
      setSearchKeyWords(event.target.value);
    } else {
      setSearchKeyWords("");
    }
  };

  const filteredPerimeterGroup = useMemo(() => {
    return [DYNAMIC_GROUP, AGENCIES_GROUP]
      .map((group) => ({
        ...group,
        columns: group.columns.filter((column) =>
          column.label.replace(/\s+/g, "").toLowerCase().includes(searchKeyWords.toLowerCase()),
        ),
      }))
      .filter((group) => group.columns.length > 0);
  }, [searchKeyWords]);

  const handleClickAll = (isSelectAll: boolean) => {
    if (isSelectAll) {
      const filteredPerimeterIds = filteredPerimeterGroup.reduce<PerimeterState>(
        (result, group) => {
          return {
            ...result,
            [group.id]: group.columns.map((column) => column.id),
          };
        },
        { perimeterDynamic: [], perimeterAgencies: [] },
      );
      onSelectAllPerimeter(filteredPerimeterIds);
    } else {
      onSelectAllPerimeter({ perimeterDynamic: [], perimeterAgencies: [] });
    }
  };

  return (
    <div className="w-full border-l border-[#6A6A6B] bg-[#242425] px-6 py-4">
      <ModalSearchBar handleChange={handleSearch} />
      <ModalSelectAllChangeButtons onClick={handleClickAll} />
      {filteredPerimeterGroup.map((group) => (
        <div key={group.label}>
          <div className="my-3 h-4 w-full text-[14px] font-bold">{group.label}</div>
          {group.columns.map((column) => (
            <Checkbox
              key={column.id}
              className="py-0.5"
              isChecked={selectOptions[group.id].includes(column.id)}
              onChange={(isSelect) => onChange(group.id, column.id, isSelect)}
              label={<div className="text-[13px]">{column.label}</div>}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PerimeterPanel;
