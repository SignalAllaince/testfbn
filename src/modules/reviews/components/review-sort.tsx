import Button from "@/components/button";
import FilterMenu from "@/components/filter-menu";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import useGetReviewOptions from "@/hooks/review/useGetReviewOptions";
import useNotification from "@/hooks/use-notification";
import DateSelect from "@/widgets/select/DateSelect";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import React, { FormEvent } from "react";

interface DateFilter {
  fromDate: Date | null;
  toDate: Date | null;
}

export interface FilterProps {
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isDateSelected: boolean;
  setFilterDate: React.Dispatch<
    React.SetStateAction<{
      date_from?: string | undefined;
      date_to?: string | undefined;
    }>
  >;
  setParams: React.Dispatch<
    React.SetStateAction<{
      sort: string;
      search: string;
    }>
  >;
  searchParams: {
    sort: string;
    search: string;
  };
}

const initialDateFilter = {
  fromDate: null,
  toDate: null,
};
function ReviewSorter({
  setParams,
  searchParams,
  isLoading,
  setPage,
  setFilterDate,
  isDateSelected,
}: FilterProps) {
  const { toast } = useNotification();
  const [sort, setSort] = React.useState("");
  const [{ fromDate, toDate }, setDateFilter] =
    React.useState<DateFilter>(initialDateFilter);
  const [search, setSearch] = React.useState("");
  const reviewOptions = useGetReviewOptions();

  const handleDateChange = (
    date: Date | null,
    origin: "fromDate" | "toDate"
  ) => {
    setDateFilter((prevState) => ({
      ...prevState,
      [origin]: date,
    }));
  };

  const onApplyDateFilter = () => {
    if (!fromDate) {
      toast({
        title: "Something went wrong",
        description: "Please select start date before filtering",
        appearance: "warning",
      });
      return;
    }
    if (!toDate) {
      toast({
        title: "Something went wrong",
        description: "Please select end date before filtering",
        appearance: "warning",
      });
      return;
    }
    setPage(1);
    setFilterDate({
      date_from: dayjs(fromDate).format("YYYY-MM-DD"),
      date_to: dayjs(toDate).format("YYYY-MM-DD"),
    });
  };

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    setPage(1);
    setParams({
      search,
      sort,
    });
  };

  const clearSearchFilter = () => {
    setPage(1);
    setSearch("");
    setParams({
      search: "",
      sort: "",
    });
  };

  const clearDateFilter = () => {
    setSearch("");
    setPage(1);
    setDateFilter(initialDateFilter);
    setFilterDate({
      date_from: undefined,
      date_to: undefined,
    });
  };
  return (
    <div className="space-y-6  px-7 pb-3">
      <div className="flex h-[2.5rem] flex-1">
        <form
          onSubmit={searchHandler}
          className="relative flex w-full max-w-xl items-end space-x-0"
        >
          <div className="space-y-1 pr-1">
            <p className="text-sm font-bold">Search By</p>
            <FilterMenu
              placeholder="All"
              position="left"
              options={
                reviewOptions?.data?.data
                  ? // @ts-expect-error
                    reviewOptions?.data?.data?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : undefined
              }
              isLoading={reviewOptions.isLoading}
              value={sort}
              style={{
                height: "2.6rem",
                borderRadius: "0px",
              }}
              onChange={(value) => setSort(value as string)}
            />
          </div>

          <div className="flex w-full flex-1">
            <CustomInput
              name="search"
              rounded="rounded-none"
              placeholder="Search"
              type="search"
              value={search}
              isDisabled={!sort}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            isLoading={isLoading && !!search}
            type="submit"
            className="rounded-none border-0 px-[12px] outline-none focus:border-0 focus:ring-0 focus:ring-transparent"
          >
            <Icon IconComp={MagnifyingGlassIcon} className="text-white" />
          </Button>

          {searchParams.search && searchParams.sort && (
            <div className="absolute -right-12 bottom-0 pl-2">
              <Button
                variant="secondary"
                onClick={clearSearchFilter}
                size="xs"
                type="button"
                className="px-[10px] outline-none"
              >
                <Icon IconComp={ArrowPathIcon} className="text-brand-blue" />
              </Button>
            </div>
          )}
        </form>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center justify-center gap-5 text-md text-brand-dark">
          <div>Filter:</div>

          <div className="flex items-center justify-start gap-2">
            <p className="text-[13px]">From</p>
            <DateSelect
              className="h-[30px] items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
              placeholderText="2013-10-12"
              selected={fromDate}
              onChange={(d) => handleDateChange(d, "fromDate")}
              // minDate={getFutureDate(1)}
              maxDate={dayjs().toDate()}
            />
          </div>

          <div className="flex items-center justify-start gap-2">
            <p className="text-[13px]">To</p>
            <DateSelect
              className="h-[30px] items-center rounded-[4px] border border-[#DAE8F2] p-3 text-lg"
              placeholderText="2013-10-12"
              selected={toDate}
              onChange={(d) => handleDateChange(d, "toDate")}
              minDate={fromDate!}
              maxDate={dayjs().toDate()}
              disabled={!fromDate}
            />
          </div>

          <Button
            size="small"
            className="text-md font-medium capitalize"
            onClick={onApplyDateFilter}
            isLoading={isLoading && isDateSelected}
          >
            Apply filter
          </Button>

          {isDateSelected && (
            <Button
              variant="secondary"
              onClick={clearDateFilter}
              size="xs"
              type="button"
              className="px-[10px] outline-none"
            >
              <Icon IconComp={ArrowPathIcon} className="text-brand-blue" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewSorter;
