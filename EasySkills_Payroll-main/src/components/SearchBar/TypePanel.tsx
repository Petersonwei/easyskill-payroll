import React, { useMemo } from "react";
import ModalSearchBar from "./ModalSearchBar";
import Checkbox from "../Checkbox";
import { FilterGroupId, TYPE_GROUP } from "../../constants/filterGroups";
import ModalSelectAllChangeButtons from "./ModalSelectAllChangeButtons";
import { FilterOptions } from "../../store/useSearchFilterStore";

type TypePanelState = Pick<FilterOptions, FilterGroupId.Types>;

type TypePanelProps = {
  selectOptions: FilterOptions;
  onChange: (groupId: FilterGroupId, columnId: string, isChecked: boolean) => void;
  onSelectAllType: (state: TypePanelState) => void;
};

const TypePanel: React.FC<TypePanelProps> = ({ selectOptions, onChange, onSelectAllType }) => {
  const [searchKeyWords, setSearchKeyWords] = React.useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length >= 2) {
      setSearchKeyWords(event.target.value);
    } else {
      setSearchKeyWords("");
    }
  };

  const filteredTypeColumns = useMemo(() => {
    return TYPE_GROUP.columns.filter((column) =>
      column.label.replace(/\s+/g, "").toLowerCase().includes(searchKeyWords.toLowerCase()),
    );
  }, [searchKeyWords]);

  const handleClickAll = (isSelectAll: boolean) => {
    if (isSelectAll) {
      const filteredTypeIds = filteredTypeColumns.reduce<TypePanelState>(
        (result, column) => {
          return {
            ...result,
            resourceTypes: [...result.resourceTypes, column.id],
          };
        },
        { resourceTypes: [] },
      );
      onSelectAllType(filteredTypeIds);
    } else {
      onSelectAllType({ resourceTypes: [] });
    }
  };

  return (
    <div className="w-full border-l border-[#6A6A6B] bg-[#242425] px-6 py-4">
      <ModalSearchBar handleChange={handleSearch} />
      <ModalSelectAllChangeButtons onClick={handleClickAll} />
      {filteredTypeColumns.map((column) => (
        <Checkbox
          key={column.id}
          className="py-1.5"
          isChecked={selectOptions[FilterGroupId.Types].includes(column.id)}
          onChange={(isChecked) => onChange(FilterGroupId.Types, column.id, isChecked)}
          label={<div className="text-[13px]">{column.label}</div>}
        />
      ))}
    </div>
  );
};

export default TypePanel;
