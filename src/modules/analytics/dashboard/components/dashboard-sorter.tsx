import Button from "@/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DateSelect from "@/widgets/select/DateSelect";
import dayjs from "dayjs";
import React from "react";

export interface FilterProps {
  isLoading: boolean;
  setFilterDate: React.Dispatch<
    React.SetStateAction<{
      date_from: string;
      date_to: string;
    }>
  >;
}

interface DateFilter {
  fromDate: Date | null;
  toDate: Date | null;
}

type DateFilterType = "day" | "week" | "month" | "year";

function DashboardSorter({ isLoading, setFilterDate }: FilterProps) {
  const dateArr: DateFilterType[] = ["day", "week", "month", "year"];
  const [active, setActive] = React.useState<DateFilterType>("day");

  const today = new Date();

  const [{ fromDate, toDate }, setDateFilter] = React.useState<DateFilter>({
    fromDate: today,
    toDate: today,
  });

  const handleFromDateChange = (date: Date | null) => {
    setDateFilter((prevState) => ({
      ...prevState,
      fromDate: date,
    }));
  };

  const handleToDateChange = (date: Date | null) => {
    setDateFilter((prevState) => ({
      ...prevState,
      toDate: date,
    }));
  };

  const onApplyDateFilter = () => {
    setFilterDate({
      date_from: dayjs(fromDate).format("YYYY-MM-DD"),
      date_to: dayjs(toDate).format("YYYY-MM-DD"),
    });
  };

  const changeTime = (substractBy: number) => {
    setDateFilter({
      fromDate: dayjs().subtract(substractBy, "days").toDate(),
      toDate: dayjs().toDate(),
    });

    setFilterDate({
      date_from: dayjs().subtract(substractBy, "days").format("YYYY-MM-DD"),
      date_to: dayjs().format("YYYY-MM-DD"),
    });
  };

  const handleTimeChange = (time: DateFilterType) => {
    setActive(time);
    if (time === "day") {
      console.log(time, "time fromDate");

      changeTime(0);
    }
    if (time === "month") {
      changeTime(31);
    }
    if (time === "week") {
      changeTime(7);
    }
    if (time === "year") {
      changeTime(365);
    }
  };

  return (
    <div className="mt-6  flex flex-wrap justify-between gap-4">
      <div className="flex items-center justify-start gap-[8px]">
        {dateArr.map((time) => (
          <TooltipProvider key={time} disableHoverableContent>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleTimeChange(time)}
                  className={`${
                    active === time ? "!bg-brand-light" : ""
                  } !h-9 w-[72px] border-brand-light !px-3 !text-[13px] !font-medium capitalize !text-brand-darkest`}
                >
                  {time}
                </Button>
              </TooltipTrigger>
              <TooltipContent arrowPadding={2}>
                {time.toUpperCase()}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="flex items-center justify-center gap-5 text-md text-brand-dark">
        <div>Filter:</div>

        <div className="flex items-center justify-start gap-2">
          <p className="text-[13px]">From</p>
          <DateSelect
            className="h-[30px] items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
            placeholderText="Departure"
            selected={fromDate}
            onChange={handleFromDateChange}
            maxDate={dayjs().toDate()}
            // minDate={getFutureDate(1)}
            nullValuePlaceHolder={fromDate?.toLocaleDateString()}
          />
        </div>

        <div className="flex items-center justify-start gap-2">
          <p className="text-[13px]">To</p>
          <DateSelect
            className="h-[30px] items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
            placeholderText="Departure"
            selected={toDate}
            onChange={handleToDateChange}
            minDate={fromDate!}
            maxDate={dayjs().toDate()}
            nullValuePlaceHolder={fromDate?.toLocaleDateString()}
          />
        </div>

        <Button size="small" isLoading={isLoading} onClick={onApplyDateFilter}>
          Apply filter
        </Button>
      </div>
    </div>
  );
}

export default DashboardSorter;
