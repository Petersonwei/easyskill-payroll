import { Box, Tab, Tabs } from "@mui/material";
import { SyntheticEvent } from "react";
import Icon from "../Icon";
import clsx from "clsx";

const tabStyle = {
  display: "flex",
  alignItems: "center",
  lineHeight: "24px",
  fontSize: "13px",
  gap: "10px",
  padding: "8px 24px",
  minHeight: "40px",
  justifyContent: "left",
  zIndex: 1,
  textTransform: "none",
  color: "#E7E7E7",
  "&.Mui-selected": {
    color: "#EDEDED",
  },
};

type VerticalTabsProps = {
  value: number;
  perimeterCheckedNum: number;
  typeCheckedNum: number;
  handleChange?: (event: SyntheticEvent<Element, Event>, newValue: any) => void;
};

const tabItems = [
  { label: "Perimeter", icon: "perimeter" },
  { label: "Type", icon: "type" },
  { label: "Period", icon: "period" },
];

const VerticalTabs: React.FC<VerticalTabsProps> = ({ value, perimeterCheckedNum, typeCheckedNum, handleChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        bgcolor: "#39393A",
        flex: "33%",
        borderTopLeftRadius: "6px",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ paddingTop: "18px", width: "100%" }}
        TabIndicatorProps={{
          sx: {
            backgroundColor: "#6A6A6B",
            padding: "none",
            width: "100%",
            zIndex: "0",
          },
        }}
      >
        {tabItems.map((tab, index) => (
          <Tab
            key={tab.label}
            label={tab.label}
            tabIndex={index}
            icon={<Icon name={tab.icon} width="14px" height="14px" />}
            iconPosition="start"
            id={`vertical-tab-${index}`}
            aria-controls={`vertical-tabpanel-${index}`}
            sx={tabStyle}
          />
        ))}
        {perimeterCheckedNum && (
          <span
            role="tabSymbolContainer"
            className={clsx(
              "absolute right-6 top-[8px] z-[1] flex h-6 w-6 items-center justify-center rounded-full ",
              `${value === 0 ? "bg-white" : "bg-[#888889]"}`,
            )}
          >
            <span
              role="tabSymbol"
              className={clsx(`${value === 0 ? "text-[#34485D]" : "text-[#E7E7E7]"}`, "text-[13px] font-[500]")}
            >
              {perimeterCheckedNum}
            </span>
          </span>
        )}
        {typeCheckedNum && (
          <span
            role="tabSymbolContainer"
            className={clsx(
              "absolute right-6 top-[48px] z-[1] flex h-6 w-6 items-center justify-center rounded-full ",
              `${value === 1 ? "bg-white" : "bg-[#888889]"}`,
            )}
          >
            <span
              role="tabSymbol"
              className={clsx(`${value === 1 ? "text-[#34485D]" : "text-[#E7E7E7]"}`, "text-[13px] font-[500]")}
            >
              {typeCheckedNum}
            </span>
          </span>
        )}
        <span
          className={clsx(
            "absolute right-6 top-[88px] z-[1] flex h-6 w-6 items-center justify-center rounded-full ",
            `${value === 2 ? "bg-white" : "bg-[#888889]"}`,
          )}
        >
          <Icon name="checkbox-checked" color={value === 2 ? "#33495d" : "#E7E7E7"} width="14px" height="14px" />
        </span>
      </Tabs>
    </Box>
  );
};

export default VerticalTabs;
