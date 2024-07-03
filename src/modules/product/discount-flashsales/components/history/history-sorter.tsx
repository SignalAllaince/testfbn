import Button from "@/components/button";
import FilterMenu from "@/components/filter-menu";
import Icon from "@/components/icon";
import CustomInput from "@/components/input";
import { catArr } from "@/utils/data";
import {
  ArrowUpOnSquareIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React, { FormEvent } from "react";

function HistoryFilter() {
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");

  const searchHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
  };
  return (
    <div className="border bg-white px-6 py-8">
      <div className="flex w-full items-start justify-between space-x-4">
        <div>
          <form
            onSubmit={searchHandler}
            className="flex w-full max-w-[400px] space-x-0"
          >
            <CustomInput
              name="search"
              rounded="rounded-none"
              placeholder="Search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              type="submit"
              className="rounded-none border-0 px-[12px] outline-none focus:border-0 focus:ring-0 focus:ring-transparent"
            >
              <Icon IconComp={MagnifyingGlassIcon} className="text-white" />
            </Button>
          </form>
          <div className="flex items-center space-x-2 pt-1 text-xs font-light text-brand-dark">
            <Icon IconComp={InformationCircleIcon} boxSize={4} />
            <p>
              Search for the product you wish to add to the Flash Sales and add
              them.
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 pt-2">
          <FilterMenu
            placeholder="Category"
            options={catArr}
            value={sort}
            onChange={(value) => setSort(value as string)}
          />
          <Button
            size="xs"
            className="rounded !text-sm"
            leftIcon={<Icon IconComp={ArrowUpOnSquareIcon} boxSize={4} />}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HistoryFilter;
