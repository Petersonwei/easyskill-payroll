import { Modal } from "@mui/material";
import React, { CSSProperties, useEffect, useState } from "react";
import VerticalTabs from "./VerticalTabs";
import TabPanel from "./TabPanel";
import PerimeterPanel from "./PerimeterPanel";
import TypePanel from "./TypePanel";
import PeriodPanel from "./PeriodPanel";
import BottomBar from "./BottomBar";
import { FilterOptions } from "../../store/useSearchFilterStore";
import { FilterGroupId } from "../../constants/filterGroups";
import dayjs from "dayjs";

const style: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "680px",
  height: "90vh",
  overflowY: "hidden",
  color: "#FFFFFF",
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translate(-50%, -20%)",
  backgroundColor: "#39393A",
  borderRadius: "6px",
};

type FilterModalProps = {
  open: boolean;
  filters: FilterOptions;
  date: string;
  activeTabValue: number;
  handleClose: (event: any) => void;
  handleSave: (filter: FilterOptions, date: string) => void;
  handleChange: (event: React.SyntheticEvent, newTabValue: number) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  filters,
  date,
  handleSave,
  handleClose,
  activeTabValue,
  handleChange,
}) => {
  const [selectOptions, setSelectOptions] = useState<FilterOptions>(filters);
  const [searchPeriod, setSearchPeriod] = useState(date);

  useEffect(() => {
    setSelectOptions(filters);
    setSearchPeriod(date);
  }, [filters, date]);

  const handleSelectChange = (groupId: FilterGroupId, columnId: string, isSelect: boolean) => {
    if (isSelect) {
      setSelectOptions((prevState) => ({
        ...prevState,
        // 根据三种类型的group，更新类型去更新对应的group状态
        [groupId]: [...prevState[groupId], columnId],
      }));
    } else {
      setSelectOptions((prevState) => ({
        ...prevState,
        [groupId]: prevState[groupId].filter((id) => id !== columnId),
      }));
    }
  };

  const handleReset = (event: any) => {
    event.stopPropagation();
    setSelectOptions({
      perimeterAgencies: [],
      perimeterDynamic: [],
      resourceTypes: [],
    });
    setSearchPeriod(dayjs().format("YYYY-MM"));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div onClick={(event) => event.stopPropagation()} style={style}>
        <div className="flex min-h-[294px] flex-grow overflow-auto">
          <VerticalTabs
            value={activeTabValue}
            handleChange={handleChange}
            perimeterCheckedNum={selectOptions.perimeterAgencies.length + selectOptions.perimeterDynamic.length}
            typeCheckedNum={selectOptions.resourceTypes.length}
          />
          <TabPanel value={activeTabValue} index={0}>
            <PerimeterPanel
              selectOptions={selectOptions}
              onSelectAllPerimeter={(values) => setSelectOptions((prevState) => ({ ...prevState, ...values }))}
              onChange={handleSelectChange}
            />
          </TabPanel>
          <TabPanel value={activeTabValue} index={1}>
            <TypePanel
              selectOptions={selectOptions}
              onSelectAllType={(values) => setSelectOptions((prevState) => ({ ...prevState, ...values }))}
              onChange={handleSelectChange}
            />
          </TabPanel>
          <TabPanel value={activeTabValue} index={2}>
            <PeriodPanel date={searchPeriod} onDateChange={setSearchPeriod} />
          </TabPanel>
        </div>
        <BottomBar
          handleReset={handleReset}
          handleClose={handleClose}
          handleSave={() => handleSave(selectOptions, searchPeriod)}
        />
      </div>
    </Modal>
  );
};

export default FilterModal;
