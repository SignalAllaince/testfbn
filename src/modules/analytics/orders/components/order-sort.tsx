import Button from "@/components/button";
import FilterMenu from "@/components/filter-menu";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import useGetOrderOptions from "@/hooks/order/useGetOrderOptions";
import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React, { FormEvent } from "react";

export interface FilterProps {
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
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

function ReviewSorter({
  setParams,
  searchParams,
  isLoading,
  setPage,
}: FilterProps) {
  const [sort, setSort] = React.useState("");
  const [search, setSearch] = React.useState("");
  const reviewOptions = useGetOrderOptions();

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
                reviewOptions?.value
                  ? reviewOptions?.value?.map((item) => ({
                      label: item.name,
                      value: item.id,
                    }))
                  : undefined
              }
              isLoading={reviewOptions.isLoading}
              value={
                reviewOptions?.value?.find((item) => item.id === sort)?.name ??
                sort
              }
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
    </div>
  );
}

export default ReviewSorter;
