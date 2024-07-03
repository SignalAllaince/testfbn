import FilterMenu from "@/components/filter-menu";
import Heading from "@/components/heading";
import useGetTotalItemsSold from "@/hooks/analytics/useGetTotalItemsSold";
import useGetTotalProductsInStock from "@/hooks/analytics/useGetTotalProductsInStock";
import { formatCurrency } from "@/lib/utils/common.utils";
import dayjs from "dayjs";
import React from "react";

type DateFilterType = "day" | "week" | "month" | "year";

export default function InventoryAnalysis() {
  const totalProductInStock = useGetTotalProductsInStock();
  const dateArr: DateFilterType[] = ["day", "week", "month", "year"];
  const [active, setActive] = React.useState<DateFilterType>("day");

  const [{ date_from, date_to }, setFilterDate] = React.useState<{
    date_from: string;
    date_to: string;
  }>({
    date_from: dayjs().format("YYYY-MM-DD"),
    date_to: dayjs().format("YYYY-MM-DD"),
  });

  const totalItemsSold = useGetTotalItemsSold({
    startDate: date_from,
    endDate: date_to,
  });

  const changeTime = (substractBy: number) => {
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
    <div className="my-4 flex flex-col justify-start gap-4 px-7 md:flex-row md:items-center">
      <div className="flex min-h-[150px] w-full flex-col justify-between space-y-4 rounded-[4px] bg-white p-5 md:max-w-sm">
        <p className="text-md font-light leading-[22px] text-obs-blue">
          Total Products in Stock
        </p>
        <Heading size="h3">
          {/* 72,895 */}
          {totalProductInStock?.value}
        </Heading>
      </div>
      <div className="flex min-h-[150px] w-full  gap-6 rounded-[4px] bg-white p-5 md:max-w-sm">
        <div className="flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <p className="min-w-[150px] text-md font-light  leading-[22px] text-obs-blue">
              Total Items Sold
            </p>
            <div>
              <FilterMenu
                style={{
                  width: "100px",
                }}
                placeholder="All"
                options={dateArr.map((item) => ({
                  label: item,
                  value: item,
                }))}
                value={active}
                onChange={(value) => handleTimeChange(value as DateFilterType)}
              />
            </div>
          </div>
          {/* <Heading size="h3">8,789,263</Heading> */}
          <Heading size="h3">
            {totalItemsSold.value
              ? // @ts-expect-error
                formatCurrency(totalItemsSold?.value!, false)
              : "**"}
          </Heading>
        </div>
      </div>
    </div>
  );
}
