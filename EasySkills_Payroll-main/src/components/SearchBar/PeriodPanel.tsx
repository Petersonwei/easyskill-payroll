import React, { useState } from "react";
import Icon from "../Icon";
import clsx from "clsx";
import ModalCalendar from "./ModalCalendar";
import dayjs from "dayjs";

type PeriodPanelProps = {
  date: string;
  onDateChange: (date: string) => void;
};

const PeriodPanel: React.FC<PeriodPanelProps> = ({ date, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date: string) => {
    onDateChange(date);
    setShowCalendar(false);
  };

  return (
    <div className="w-full border-l border-[#6A6A6B] bg-[#242425] px-6 py-4">
      <div className="mb-3 h-2 w-full text-[12px] text-[#B0B0B0]">Month</div>
      <button
        className={clsx(
          "flex w-full cursor-text items-center gap-2",
          `${showCalendar ? "border-b border-[#FEA500]" : "hover:border-b hover:border-[rgb(106,106,107)]"}`,
        )}
        onClick={() => setShowCalendar(true)}
      >
        <Icon name="period" color="white" width="14px" height="14px" />
        <span className="text-[14px]">{dayjs(date).format("MMMM YYYY")}</span>
      </button>
      {showCalendar && <ModalCalendar onDateChange={handleDateChange} date={date} />}
    </div>
  );
};

export default PeriodPanel;
