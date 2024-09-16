import React, { useMemo, useState } from "react";
import Icon from "../Icon";
import clsx from "clsx";
import dayjs from "dayjs";

type ModalCalendarProps = {
  date: string;
  onDateChange: (date: string) => void;
};

const ModalCalendar: React.FC<ModalCalendarProps> = ({ date, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs(date));

  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => dayjs(selectedDate).month(i));
  }, [selectedDate]);
  // ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="mt-4 flex w-full items-center justify-start">
      <div className="w-[275px] px-4 text-white">
        <div className="mb-4 flex w-[252px] items-center justify-center gap-24">
          <button
            className="rounded py-2 font-bold text-white hover:text-[#FEA500]"
            onClick={() => setSelectedDate((prev) => prev.add(-1, "year"))}
          >
            {<Icon name="back-arrow" color="white" width="13px" height="13px" />}
          </button>
          <span className="text-[16px] font-semibold">{selectedDate.year()}</span>
          <button
            className="rounded py-2 font-bold text-white hover:text-[#FEA500]"
            onClick={() => setSelectedDate((prev) => prev.add(1, "year"))}
          >
            {<Icon name="front-arrow" color="white" width="13px" height="13px" />}
          </button>
        </div>
        <div className="grid w-full grid-cols-4 gap-1 pl-[7px]">
          {months.map((month, index) => (
            <div
              key={index}
              className={clsx(
                "flex cursor-pointer items-center justify-center rounded-md p-4 text-center hover:bg-[#FEA500] hover:text-[#242425]",
                `${month.isSame(dayjs(date), "month") ? "bg-[#D3D3D3] text-[#242425]" : "bg-transparent"}`,
              )}
              onClick={() => onDateChange(month.format("YYYY-MM"))}
            >
              {month.format("MMM")}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalCalendar;
