/* eslint-disable react/display-name */
import Button from "@/components/button";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";

interface DateSelectProps {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: Date | null) => any;
  placeholderText?: string;
  selected?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  style?: React.CSSProperties;
  disabled?: boolean;
  nullValuePlaceHolder?: string;
}

export default function DateSelect({
  className = "",
  onChange,
  placeholderText,
  selected,
  minDate,
  maxDate,
  style,
  disabled = false,
  nullValuePlaceHolder = "",
}: DateSelectProps) {
  const CustomInput = React.forwardRef(
    ({ value, onClick, onChange }: any, ref: any) => {
      return (
        <div
          onClick={onClick}
          className={
            "item-center flex !h-10 w-full max-w-[130px] cursor-pointer items-center border bg-white" +
            className +
            (disabled ? " opacity-80" : " hover:border-[#B0BACA]")
          }
          style={style}
        >
          <input
            className="placeholder:text-blue-11 text-blue-11 w-full bg-transparent text-[13px] focus:outline-none disabled:cursor-not-allowed"
            value={value ? value : nullValuePlaceHolder}
            onChange={onChange}
            placeholder={placeholderText}
            ref={ref}
            disabled={disabled}
          />

          <Button
            variant="menu"
            onClick={onClick}
            size="xs"
            className="!h-6 !w-5 items-center !justify-center !px-0"
          >
            <AiOutlineCalendar color="#627496" size="20" />
          </Button>
        </div>
      );
    }
  );
  return (
    <div>
      <DatePicker
        onChange={(e: any) => onChange && onChange(e)}
        customInput={<CustomInput />}
        selected={selected}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
      />
    </div>
  );
}
