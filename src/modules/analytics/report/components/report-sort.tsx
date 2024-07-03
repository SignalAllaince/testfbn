import Button from "@/components/button";
import FilterMenu from "@/components/filter-menu";
import { catArr } from "@/utils/data";
import DateSelect from "@/widgets/select/DateSelect";
import dayjs from "dayjs";
import React from "react";

interface DateFilter {
  fromDate: Date | null;
  toDate: Date | null;
}

function ReportSorter() {
  const today = new Date();
  const [sort, setSort] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState<DateFilter>({
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
  return (
    <div className="flex justify-between px-7 pb-3">
      <div className="flex items-center justify-center gap-5 text-md text-brand-dark">
        <div>Filter:</div>

        <div className="flex items-center justify-start gap-2">
          <p className="text-[13px]">From</p>
          <DateSelect
            className="h-[30px] items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
            placeholderText="Departure"
            selected={dateFilter.fromDate}
            onChange={handleFromDateChange}
            // minDate={getFutureDate(1)}
            nullValuePlaceHolder={dateFilter.fromDate?.toLocaleDateString()}
          />
        </div>

        <div className="flex items-center justify-start gap-2">
          <p className="text-[13px]">To</p>
          <DateSelect
            className="h-[30px] items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
            placeholderText="Departure"
            selected={dateFilter.toDate}
            onChange={handleToDateChange}
            maxDate={dayjs().toDate()}
            // minDate={getFutureDate(1)}
            nullValuePlaceHolder={dateFilter.fromDate?.toLocaleDateString()}
          />
        </div>

        <Button size="small" className="text-md font-medium capitalize">
          Apply filter
        </Button>
      </div>
      <FilterMenu
        placeholder="Category"
        options={catArr}
        value={sort}
        onChange={(value) => setSort(value as string)}
      />
    </div>
  );
}

export default ReportSorter;
