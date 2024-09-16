import React from "react";
import Icon from "./Icon";
import clsx from "clsx";

type CheckboxProps = {
  isChecked: boolean;
  onChange?: (isChecked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ onChange, isChecked, label, className }) => {
  return (
    <div className={clsx("flex items-center gap-[10px]", className)}>
      <div
        className={clsx(
          "relative flex h-[15px] w-[15px] cursor-pointer items-center justify-center rounded-[2px] border border-[rgba(255,255,255,0.88)]",
        )}
        onClick={(event) => {
          event.stopPropagation();
          onChange?.(!isChecked);
        }}
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
      >
        {isChecked && <Icon name="checkbox-checked" color="#FEA500" id="checked" />}
      </div>
      {label}
    </div>
  );
};

export default Checkbox;
